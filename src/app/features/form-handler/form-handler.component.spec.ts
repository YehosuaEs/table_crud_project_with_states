import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { projectsMock } from '../list/mocks/project.mock';
import { ProjectsStore } from '../list/store/project-list.store';
import { FormHandlerComponent } from './form-handler.component';

describe('FormHandlerComponent', () => {
  let component: FormHandlerComponent;
  let fixture: ComponentFixture<FormHandlerComponent>;
  let router: Router;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let activatedRoute: ActivatedRoute;
  const id = projectsMock[0].id;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHandlerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue(id)
              }
            }
          }
        },
        {
          provide: ProjectsStore,
          useValue: {
            projectsData: jasmine.createSpy('projectsData').and.returnValue(projectsMock),
            updateProject: jasmine.createSpy('updateProject')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormHandlerComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update an existing project if isEditMode true', () => {
    spyOn(component, 'isEditMode').and.returnValue(true);
    spyOn(component, 'project').and.returnValue(projectsMock[0]);
    const updateProjectStoreSpy = spyOn(component['projectListStore'], 'updateProject');
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.form().patchValue({
      name: 'Proyecto Angular',
      description: 'lorem ipsum dolor',
      status: true
    });

    component.handleSubmit();

    expect(updateProjectStoreSpy).toHaveBeenCalledWith({
      id: projectsMock[0].id,
      updatedProject: {
        id: projectsMock[0].id,
        name: 'Proyecto Angular',
        description: 'lorem ipsum dolor',
        status: true
      }
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/projects']);
  });

  it('should create a new project when isEditMode false', () => {
    spyOn(component, 'isEditMode').and.returnValue(false);

    const addProjectStoreSpy = spyOn(component['projectListStore'], 'addProject');
    const routerSpy = spyOn(router, 'navigate');

    component.form().patchValue({
      name: 'New Project',
      description: 'lorem ipsum dolor',
      status: true
    });

    component.handleSubmit();

    expect(addProjectStoreSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        id: jasmine.any(String),
        name: 'New Project',
        description: 'lorem ipsum dolor',
        status: true
      })
    );
    expect(routerSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/projects']);
  });
});
