import { Routes } from '@angular/router';
import { DigitalMenuComponent } from './digital-menu/digital-menu.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './admin/auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'digital-menu', component: DigitalMenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/digital-menu', pathMatch: 'full' },
];
