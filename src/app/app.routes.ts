import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'projects', loadComponent: () => import('./features/list/list.component').then(c => c.ListComponent) },
  { path: 'form/:id', loadComponent: () => import('./features/form/form.component').then(c => c.FormComponent) },
  // { path: 'form', loadComponent: () => import('./features/form/form.component').then(c => c.FormComponent) },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
