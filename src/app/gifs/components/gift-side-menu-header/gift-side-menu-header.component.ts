import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'gift-side-menu-header',
   standalone: true,
  imports: [],
  templateUrl: './gift-side-menu-header.component.html',

})
export class GiftSideMenuHeaderComponent {
  envs = environment
 }
