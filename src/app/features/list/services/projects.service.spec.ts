import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Project } from '../interfaces/project.interface';
import { projectsMock } from '../mocks/project.mock';
import { ProjectsService } from './projects.service';

const DELAY_TIME = 2000;
describe('ProjectsService', () => {
  let service: ProjectsService;
  const originalMockData = [
    { id: 'id-1', name: 'Project 1', description: 'Description 1', status: false },
    { id: 'id-2', name: 'Project 2', description: 'Description 2', status: true },
    { id: 'id-3', name: 'Project 3', description: 'Description 3', status: false }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsService);
    projectsMock.length = 0;
    projectsMock.push(...originalMockData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of projects', fakeAsync(() => {
    service.getProjects().subscribe(projects => {
      expect(projects).toEqual(projectsMock);
      tick();
    });
  }));

  it('should add a new project', fakeAsync(() => {
    const newProject: Project = {
      id: 'id-4',
      name: 'New Project',
      description: 'lorem Ipsum description',
      status: false
    };

    service.addProject(newProject).subscribe();
    tick(DELAY_TIME);

    expect(projectsMock.length).toBe(4);
    expect(projectsMock[3]).toEqual(newProject);
  }));

  it('should update an existing project', fakeAsync(() => {
    const updatedProject: Project = {
      id: 'id-1',
      name: 'Updated Project',
      description: 'Updated description',
      status: false
    };

    service.updateProject('id-1', updatedProject).subscribe();
    tick(DELAY_TIME);

    const project = projectsMock.find(project => project.id === 'id-1');
    expect(project).toEqual(updatedProject);
  }));

  it('should delete a project', fakeAsync(() => {
    expect(projectsMock.length).toBe(3);

    const idToDelete = 'id-1';

    service.deleteProject(idToDelete).subscribe();
    tick(DELAY_TIME);

    expect(projectsMock.length).toBe(2);
  }));
});
