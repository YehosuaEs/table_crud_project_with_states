import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of, throwError } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { projectsMock } from '../mocks/project.mock';
import { ProjectsService } from '../services/projects.service';
import { ProjectsStore } from './project-list.store';
const DELAY_TIME = 100;
const ERROR_MESSAGE = 'Something went wrong';

describe('ProjectsStore Methods', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setup = () => {
    const projectsService = {
      getProjects: jasmine.createSpy('getProjects').and.returnValue(of(projectsMock).pipe(delay(DELAY_TIME))),
      addProject: jasmine.createSpy('addProject').and.returnValue(of(undefined).pipe(delay(DELAY_TIME))),
      updateProject: jasmine.createSpy('updateProject').and.returnValue(of(undefined).pipe(delay(DELAY_TIME))),
      deleteProject: jasmine.createSpy('deleteProject').and.returnValue(of(undefined).pipe(delay(DELAY_TIME)))
    };

    TestBed.configureTestingModule({
      providers: [
        ProjectsStore,
        {
          provide: ProjectsService,
          useValue: projectsService
        }
      ]
    });

    return {
      store: TestBed.inject(ProjectsStore),
      projectsService
    };
  };

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should have projects', fakeAsync(() => {
    const { store, projectsService } = setup();

    tick(DELAY_TIME);
    expect(projectsService.getProjects).toHaveBeenCalled();
    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(3);
    tick(DELAY_TIME);
    expect(store.isLoading()).toEqual(false);
  }));

  it('should add a project', fakeAsync(() => {
    const { store, projectsService } = setup();
    const addNewProject: Project = {
      id: 'id-123456',
      name: 'Project Electron ',
      description: 'lorem Ipsum description ',
      status: true
    };

    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(3);

    store.addProject(addNewProject);
    expect(store.isLoading()).toBeTrue();

    tick(DELAY_TIME);
    expect(projectsService.addProject).toHaveBeenCalledWith(addNewProject);
    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(4);
    expect(store.projectsData()[3]).toEqual(addNewProject);
    tick(DELAY_TIME);
    expect(store.isLoading()).toEqual(false);
  }));

  it('should update a project', fakeAsync(() => {
    const { store, projectsService } = setup();
    const id = projectsMock[0].id;
    const updateName = 'Project Angular with Typescript';
    const updatedProject: Project = { ...projectsMock[0], name: updateName };

    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(3);
    expect(store.projectsData()[0].name).not.toBe(updateName);

    store.updateProject({ id, updatedProject });
    expect(store.isLoading()).toBeTrue();

    tick(DELAY_TIME);
    expect(projectsService.updateProject).toHaveBeenCalledWith(id, updatedProject);
    tick(DELAY_TIME);
    expect(store.projectsData()[0].name).toBe(updateName);
    tick(DELAY_TIME);
    expect(store.isLoading()).toEqual(false);
  }));

  it('should delete a project', fakeAsync(() => {
    const { store, projectsService } = setup();
    const id = projectsMock[0].id;

    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(3);

    store.deleteProject(id);

    tick(DELAY_TIME);
    expect(projectsService.deleteProject).toHaveBeenCalledWith(id);
    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(2);
    tick(DELAY_TIME);
    expect(store.isLoading()).toEqual(false);
  }));
});

describe('ProjectsStore Error Handling', () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const setup = () => {
    const projectsService = {
      getProjects: jasmine.createSpy('getProjects').and.returnValue(throwError(() => new Error(ERROR_MESSAGE))),
      addProject: jasmine.createSpy('addProject').and.returnValue(throwError(() => new Error(ERROR_MESSAGE))),
      updateProject: jasmine.createSpy('updateProject').and.returnValue(throwError(() => new Error(ERROR_MESSAGE))),
      deleteProject: jasmine.createSpy('deleteProject').and.returnValue(throwError(() => new Error(ERROR_MESSAGE)))
    };

    TestBed.configureTestingModule({
      providers: [ProjectsStore, { provide: ProjectsService, useValue: projectsService }]
    });

    return { store: TestBed.inject(ProjectsStore), projectsService };
  };

  it('should throwError when _loadProjects method call', fakeAsync(() => {
    const { store, projectsService } = setup();

    tick(DELAY_TIME);
    expect(projectsService.getProjects).toHaveBeenCalled();
    tick(DELAY_TIME);
    expect(store.error()).toContain(ERROR_MESSAGE);
    tick(DELAY_TIME);
    expect(store.isLoading()).toBeFalse();
  }));

  it('should throwError when addProject method call', fakeAsync(() => {
    const { store, projectsService } = setup();
    const newProject = { id: 'id-123456', name: 'New Project', description: 'Test Description', status: true };

    store.addProject(newProject);

    tick(DELAY_TIME);
    expect(projectsService.addProject).toHaveBeenCalledWith(newProject);
    tick(DELAY_TIME);
    expect(store.error()).toContain(ERROR_MESSAGE);
    expect(store.isLoading()).toBeFalse();
  }));

  it('should throwError when updateProject method call', fakeAsync(() => {
    const { store, projectsService } = setup();
    const updatedProject = { ...projectsMock[0], name: 'Updated Name' };

    store.updateProject({ id: projectsMock[0].id, updatedProject });

    tick(DELAY_TIME);
    expect(projectsService.updateProject).toHaveBeenCalledWith(projectsMock[0].id, updatedProject);
    tick(DELAY_TIME);
    expect(store.error()).toContain(ERROR_MESSAGE);
    expect(store.isLoading()).toBeFalse();
  }));

  it('should throwError when deleteProject method call', fakeAsync(() => {
    const { store, projectsService } = setup();
    const idToDelete = projectsMock[0].id;

    store.deleteProject(idToDelete);

    tick(DELAY_TIME);
    expect(projectsService.deleteProject).toHaveBeenCalledWith(idToDelete);
    tick(DELAY_TIME);
    expect(store.error()).toContain(ERROR_MESSAGE);
    expect(store.isLoading()).toBeFalse();
  }));
});
