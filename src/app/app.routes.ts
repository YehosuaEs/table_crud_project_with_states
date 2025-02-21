import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'projects', loadComponent: () => import('./features/list/list.component').then(c => c.ListComponent) },
  {
    path: 'form/create_project',
    loadComponent: () => import('./features/form-handler/form-handler.component').then(c => c.FormHandlerComponent)
  },
  {
    path: 'form/:id',
    loadComponent: () => import('./features/form-handler/form-handler.component').then(c => c.FormHandlerComponent)
  },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
