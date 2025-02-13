import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { projectsMock } from '../mocks/project.mock';

const DELAY_TIME = 1500;
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  public getProjects(): Observable<Project[]> {
    return of(projectsMock).pipe(delay(DELAY_TIME));
  }

  public addProject(project: Project): Observable<void> {
    projectsMock.push(project);
    return of().pipe(delay(DELAY_TIME));
  }

  public updateProject(id: string, updatedProject: Project): Observable<void> {
    const index = projectsMock.findIndex((project: Project): boolean => project.id === id);
    if (index !== -1) {
      projectsMock[index] = { ...projectsMock[index], ...updatedProject };
    }
    return of().pipe(delay(DELAY_TIME));
  }

  public deleteProject(id: string): Observable<void> {
    const index = projectsMock.findIndex((project: Project): boolean => project.id === id);
    if (index !== -1) {
      projectsMock.splice(index, 1);
    }
    return of().pipe(delay(DELAY_TIME));
  }
}
