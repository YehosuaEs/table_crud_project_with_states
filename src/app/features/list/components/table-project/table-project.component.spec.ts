import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { projectsMock } from '../../mocks/project.mock';
import { TableProjectComponent } from './table-project.component';

describe('TableProjectComponent', () => {
  let component: TableProjectComponent;
  let fixture: ComponentFixture<TableProjectComponent>;
  let componentRef: ComponentRef<TableProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableProjectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableProjectComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('projects', projectsMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
