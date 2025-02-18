import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { ListComponent } from './list.component';
import { projectsMock } from './mocks/project.mock';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [Router]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the create form view', () => {
    const spy = spyOn(router, 'navigate');

    component.onAdd();

    expect(spy).toHaveBeenCalledWith(['/form/create_project']);
  });

  it('should navigate to /form when onEdit is called', () => {
    const spy = spyOn(router, 'navigate');
    const project = projectsMock[0];

    component.onEdit(project);

    expect(spy).toHaveBeenCalledWith(['/form', project.id]);
  });

  it('should call deleteProject when onDelete is called and user confirms', () => {
    const id = projectsMock[0].id;
    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    component.onDelete(id);
    expect(confirmSpy).toHaveBeenCalled();
  });
});
