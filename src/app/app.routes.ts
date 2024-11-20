import { Routes } from '@angular/router';
import { DigitalMenuComponent } from './digital-menu/digital-menu.component';
import { AuthComponent } from './admin/auth/auth.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './admin/auth.guard';
import { CartComponent } from './digital-menu/cart/cart.component';

export const routes: Routes = [
  {
    path: 'digital-menu',
    component: DigitalMenuComponent,
    children: [
      {
        path: ':restaurant_id',
        children: [
          {
            path: ':table_number',
            component: DigitalMenuComponent,
          },
          {
            path: '',
            component: DigitalMenuComponent,
          },
        ],
      },
      {
        path: '',
        component: DigitalMenuComponent,
      },
    ],
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/digital-menu',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/digital-menu',
    pathMatch: 'full',
  },
];
