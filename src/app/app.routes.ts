import { Routes } from '@angular/router';
import { DigitalMenuComponent } from './digital-menu/digital-menu.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: 'digital-menu', component: DigitalMenuComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: '/digital-menu', pathMatch: 'full' },
];
