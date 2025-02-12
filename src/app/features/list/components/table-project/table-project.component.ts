import { CommonModule } from '@angular/common';
import { Component, input, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { Project } from '../../interfaces/project.interface';

@Component({
  selector: 'app-table-project',
  imports: [CommonModule, TableModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './table-project.component.html',
  styleUrl: './table-project.component.scss'
})
export class TableProjectComponent {
  @ViewChild('projectsListTable') public projectsListTable!: Table;
  public projects = input.required<Project[]>();
  public edit = output<Project>();
  public delete = output<string>();

  public onFilterTable(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.projectsListTable.filterGlobal(filterValue, 'contains');
  }

  public onEdit(project: Project): void {
    this.edit.emit(project);
  }

  public onDelete(id: string): void {
    this.delete.emit(id);
  }
}
