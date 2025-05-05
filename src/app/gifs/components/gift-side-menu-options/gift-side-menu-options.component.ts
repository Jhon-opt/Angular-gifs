import {  Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../services/gifs.service';


interface MenuOptions {
  label: string;
  sublabel: string;
  router: string;
  icon: string;
}
@Component({
  selector: 'gift-side-menu-options',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './gift-side-menu-options.component.html',

})
export class GiftSideMenuOptionsComponent {
  menuOptions: MenuOptions[] = [
    {
      label: 'Trending',
      sublabel: 'Gifs populares',
      router: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Search',
      sublabel: 'Buscar gifs',
      router: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    }
  ]

  gifService = inject(GifsService);

 }
