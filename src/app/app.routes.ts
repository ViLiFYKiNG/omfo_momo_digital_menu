import { Routes } from '@angular/router';
import { DigitalMenuComponent } from './digital-menu/digital-menu.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './admin/auth/auth.component';

export const routes: Routes = [
  { path: 'digital-menu', component: DigitalMenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: '/digital-menu', pathMatch: 'full' },
];
