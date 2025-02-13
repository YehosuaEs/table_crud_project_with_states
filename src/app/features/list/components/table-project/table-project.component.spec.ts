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

  it('should emit add event when onAddNew is called', () => {
    const spyEmit = spyOn(component.add, 'emit');

    component.onAddNew();

    expect(spyEmit).toHaveBeenCalled();
  });

  it('should emit edit event with the correct project when onEdit is called', () => {
    const project = projectsMock[0];
    const spyEmit = spyOn(component.edit, 'emit');

    component.onEdit(project);

    expect(spyEmit).toHaveBeenCalledWith(project);
  });

  it('should emit delete event with the correct project id when onDelete is called', () => {
    const projectId = 'id-1';
    const spyEmit = spyOn(component.delete, 'emit');

    component.onDelete(projectId);

    expect(spyEmit).toHaveBeenCalledWith(projectId);
  });
});
