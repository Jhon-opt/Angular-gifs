import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';

import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
 // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',

})
export default class TrendingPageComponent implements AfterViewInit {


  gifService = inject(GifsService);
  ScrollStateService = inject(ScrollStateService);
  scrollDivRef= viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv= this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;
    scrollDiv.scrollTop = this.ScrollStateService.trendingScrollState();
  }

  onScroll(event : Event) {
    const scrollDiv= this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    // console.log(scrollTop,clientHeight,scrollHeight);
    const isAtBottom = scrollTop + clientHeight+300 >= scrollHeight;
    this.ScrollStateService.trendingScrollState.set(scrollTop);
    console.log(isAtBottom);

    if (isAtBottom) {
      this.gifService.loadtrendingGifs();
    }
  }

}
