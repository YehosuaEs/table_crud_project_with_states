/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsStore } from './../list/store/project-list.store';

import { ActivatedRoute, Router } from '@angular/router';
import { projectsMock } from '../list/mocks/project.mock';
import { EditFormComponent } from './edit-form.component';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const id = projectsMock[0].id;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFormComponent],
      providers: [
        Router,
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

    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  call onSubmit to update the project', () => {
    const routerSpy = spyOn(router, 'navigate');

    spyOn(component, 'project').and.returnValue(projectsMock[0]);

    component.projectId.set(id);

    component.projectForm.setValue({
      name: 'Updated Project',
      description: 'Updated Description',
      status: true
    });

    component.onSubmit();

    expect(routerSpy).toHaveBeenCalledWith(['/projects']);
  });
});
