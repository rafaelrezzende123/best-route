import { Routes } from '@angular/router';
import { BestRouteComponent } from './best.route/best.route.component';
import { RouteComponent } from './route/route.component';

export const routes: Routes = [
  { path: 'route', component: RouteComponent },
  { path: 'best-route', component: BestRouteComponent },
  { path: '', redirectTo: '/route', pathMatch: 'full' }
];
