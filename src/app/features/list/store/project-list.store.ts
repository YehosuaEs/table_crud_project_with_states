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
  withState(initialState),

  withComputed(({ _projects }) => ({
    projectsData: _projects,
    count: computed(() => _projects().length)
  })),

  withMethods(store => ({
    _setLoading(): void {
      patchState(store, { isLoading: true });
    },
    _setLoaded(): void {
      patchState(store, { isLoading: false });
    },
    _setProjects(_projects: Project[]): void {
      patchState(store, { _projects });
    },
    _setError(error: string): void {
      patchState(store, { error });
    },
    _addProject(project: Project): void {
      patchState(store, {
        _projects: [...store._projects(), project]
      });
    },
    _updateProject(id: string, updatedProject: Project): void {
      patchState(store, {
        _projects: store._projects().map(project => (project.id === id ? { ...project, ...updatedProject } : project))
      });
    },
    _deleteProject(id: string): void {
      patchState(store, { _projects: store._projects().filter(project => project.id !== id) });
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
            finalize(() => store._setLoaded())
          )
        )
      )
    ),
    addProject: rxMethod<Project>(
      pipe(
        tap(() => store._setLoading()),
        switchMap((project: Project) =>
          projectsService.addProject(project).pipe(
            tapResponse({
              next: () => store._addProject(project),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => store._setLoaded())
          )
        )
      )
    ),
    updateProject: rxMethod<{ id: string; updatedProject: Project }>(
      pipe(
        tap(() => store._setLoading()),
        switchMap(({ id, updatedProject }) =>
          projectsService.updateProject(id, updatedProject).pipe(
            tapResponse({
              next: () => store._updateProject(id, updatedProject),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => store._setLoaded())
          )
        )
      )
    ),
    deleteProject: rxMethod<string>(
      pipe(
        tap(() => store._setLoading()),
        switchMap((id: string) =>
          projectsService.deleteProject(id).pipe(
            tapResponse({
              next: () => store._deleteProject(id),
              error: (error: HttpErrorResponse) => store._setError(error.message)
            }),
            finalize(() => store._setLoaded())
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
