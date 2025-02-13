import { HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { ProjectsService } from '../services/projects.service';
interface ProjectsState {
  _projects: Project[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: ProjectsState = {
  _projects: [],
  isLoading: false,
  error: null
};

export const ProjectsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed(({ _projects }) => ({
    projectsData: _projects,
    count: computed(() => _projects().length)
  })),

  withMethods(store => ({
    _setLoading(): void {
      patchState(store, { _projects: [], isLoading: true, error: null });
    },
    _setProjects(_projects: Project[]): void {
      patchState(store, { _projects, error: null });
    },
    _setError(error: string): void {
      patchState(store, { _projects: [], error });
    },
    _addProject(): void {
      patchState(store, { error: null });
    },
    _updateProject(): void {
      patchState(store, { error: null });
    },
    _deleteProject(): void {
      patchState(store, { error: null });
    }
  })),

  withMethods((store, projectsService = inject(ProjectsService)) => ({
    _loadProjects: rxMethod<void>(
      pipe(
        tap(() => store._setLoading()),
        switchMap(() =>
          projectsService.getProjects().pipe(
            tapResponse({
              next: (projects: Project[]) => store._setProjects(projects),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    addProject: rxMethod<Project>(
      pipe(
        switchMap((project: Project) =>
          projectsService.addProject(project).pipe(
            tapResponse({
              next: () => store._addProject(),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    updateProject: rxMethod<{ id: string; updatedProject: Project }>(
      pipe(
        switchMap(({ id, updatedProject }) =>
          projectsService.updateProject(id, updatedProject).pipe(
            tapResponse({
              next: () => store._updateProject(),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    deleteProject: rxMethod<string>(
      pipe(
        switchMap((id: string) =>
          projectsService.deleteProject(id).pipe(
            tapResponse({
              next: () => store._deleteProject(),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    )
  })),

  withHooks({
    onInit(store) {
      effect(() => {
        store._loadProjects();
      });
    }
  })
);
