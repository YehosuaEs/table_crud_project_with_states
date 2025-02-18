import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Project } from '../interfaces/project.interface';
import { projectsMock } from '../mocks/project.mock';
import { ProjectsService } from './projects.service';

const DELAY_TIME = 2000;
describe('ProjectsService', () => {
  let service: ProjectsService;
  const originalMockData = [
    { id: projectsMock[0].id, name: 'Project 1', description: 'Description 1', status: false },
    { id: projectsMock[1].id, name: 'Project 2', description: 'Description 2', status: true },
    { id: projectsMock[2].id, name: 'Project 3', description: 'Description 3', status: false }
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
      id: 'id-123456',
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
      ...projectsMock[0],
      name: 'Updated Project'
    };

    service.updateProject(projectsMock[0].id, updatedProject).subscribe();
    tick(DELAY_TIME);

    const project = projectsMock.find(project => project.id === projectsMock[0].id);
    expect(project).toEqual(updatedProject);
  }));

  it('should delete a project', fakeAsync(() => {
    expect(projectsMock.length).toBe(3);

    const idToDelete = projectsMock[2].id;

    service.deleteProject(idToDelete).subscribe();
    tick(DELAY_TIME);

    expect(projectsMock.length).toBe(2);
  }));
});
