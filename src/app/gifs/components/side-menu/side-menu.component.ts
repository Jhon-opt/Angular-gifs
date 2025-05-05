import {  Component } from '@angular/core';
import { GiftSideMenuHeaderComponent } from "../gift-side-menu-header/gift-side-menu-header.component";
import { GiftSideMenuOptionsComponent } from "../gift-side-menu-options/gift-side-menu-options.component";

@Component({
  selector: 'gift-side-menu',
  standalone: true,
  imports: [GiftSideMenuHeaderComponent, GiftSideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',

})
export class SideMenuComponent { }
