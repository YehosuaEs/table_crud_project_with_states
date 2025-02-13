import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { Project } from '../interfaces/project.interface';
import { projectsMock } from '../mocks/project.mock';
import { ProjectsService } from '../services/projects.service';
import { ProjectsStore } from './project-list.store';
const DELAY_TIME = 100;

describe('ProjectsStore Initial states', () => {
  it('should check initial state of projectsData ', () => {
    const store = TestBed.inject(ProjectsStore);

    expect(store.projectsData()).toEqual([]);
    expect(store.count()).toBeDefined();
  });
});

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
      description: 'Lorem ipsum dolor sit, consectetur',
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
    expect(store.isLoading()).toBeTrue();

    tick(DELAY_TIME);
    expect(projectsService.deleteProject).toHaveBeenCalledWith(id);
    tick(DELAY_TIME);
    expect(store.projectsData().length).toBe(2);
    tick(DELAY_TIME);
    expect(store.isLoading()).toEqual(false);
  }));
});
