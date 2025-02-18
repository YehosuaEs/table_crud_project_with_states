import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'projects', loadComponent: () => import('./features/list/list.component').then(c => c.ListComponent) },
  {
    path: 'form/create_project',
    loadComponent: () => import('./features/create-form/create-form.component').then(c => c.CreateFormComponent)
  },
  {
    path: 'form/:id',
    loadComponent: () => import('./features/edit-form/edit-form.component').then(c => c.EditFormComponent)
  },
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
