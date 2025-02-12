import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-table-project',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './table-project.component.html',
  styleUrl: './table-project.component.scss'
})
export class TableProjectComponent {
  public projects = input.required<Project[]>();

  public edit = output<Project>();
  public delete = output<string>();

  public onEdit(project: Project): void {
    this.edit.emit(project);
  }

  public onDelete(id: string): void {
    this.delete.emit(id);
  }
}
