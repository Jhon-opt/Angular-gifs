import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifsMapper } from '../mapper/gifs.mapper';
import { map, tap } from 'rxjs';

const GIFS_KEY = 'gifsHistory';
const loadfromLocalStorage = () =>{
  const gifsStringLocalStorage = localStorage.getItem(GIFS_KEY) ?? '{}';
  const gifsL = JSON.parse(gifsStringLocalStorage);
  console.log({gifsL});
  return gifsL;
}

@Injectable({providedIn: 'root'})

export class GifsService {



  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading =signal(true);
//logica para dividir los gifs en grupos de 3 para el masonry
trendingGifGroup = computed<Gif[][]>(() => {
  const groups = [];
  const gifs = this.trendingGifs(); // Obtenemos el array de GIFs original
  // Iteramos sobre el array original (`gifs`), no sobre `trendingGifGroup`
  for (let index = 0; index < gifs.length; index += 3) {
    groups.push(gifs.slice(index, index + 3)); // Agrupamos de 3 en 3
  }
  console.log(groups); // Debug opcional
  return groups;
});

  searchHistory = signal<Record<string, Gif[]>>(loadfromLocalStorage());
  serachHistoryKeys = computed(()=> Object.keys(this.searchHistory()));
  constructor (){
    this.loadtrendingGifs();
  }

  saveGifsToLocalStorage= effect(()=> {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIFS_KEY, historyString);
  })
  loadtrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphy_api_url}/gifs/trending`,
      {
        params:{
          api_key: environment.giphy_apikey,
          limit: '20',


        }
      }
     ).subscribe((response) => {
        const gifs = GifsMapper.mapGiphyItemsToGifsArray(response.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log(gifs);

     });
  }


  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphy_api_url}/gifs/search`,
      {
        params:{
          api_key: environment.giphy_apikey,
          q: query,
          limit: '20',
        }
      }
     ).pipe(
      map(({data}) => data),
      map((items)=> GifsMapper.mapGiphyItemsToGifsArray(items)),

      // todo historial
      tap((items) => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLocaleLowerCase()]: items
        }))
      })
     );



     /*.subscribe((response) => {
        const gifs = GifsMapper.mapGiphyItemsToGifsArray(response.data);

        console.log({search: gifs});

     });*/
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
