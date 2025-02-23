import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from './form.component';

const formMock = new FormGroup({
  name: new FormControl('', [Validators.required]),
  description: new FormControl('', []),
  status: new FormControl('', [])
});

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let componentRef: ComponentRef<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('form', formMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit formSubmit when the form is valid', () => {
    const emitSpy = spyOn(component.formSubmit, 'emit');

    formMock.patchValue({
      name: 'Project name',
      description: 'Lorem ipsum',
      status: 'Active'
    });

    component.onSubmit();

    expect(emitSpy).toHaveBeenCalled();
  });
});
