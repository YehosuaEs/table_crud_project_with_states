import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter, Router } from '@angular/router';
import { CreateFormComponent } from './create-form.component';

describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFormComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  call onSubmit and navigate', () => {
    const routerSpy = spyOn(router, 'navigate');

    component.projectForm.setValue({
      name: 'Project Electron ',
      description: 'lorem Ipsum description ',
      status: true
    });

    component.onSubmit();

    expect(routerSpy).toHaveBeenCalled();
  });
});
