import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableProjectComponent } from './components/table-project/table-project.component';
import { Project } from './interfaces/project.interface';
import { ProjectsStore } from './store/project-list.store';

@Component({
  selector: 'app-list',
  imports: [TableProjectComponent, CommonModule],
  providers: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public readonly projectListStore = inject(ProjectsStore);
  private readonly router: Router = inject(Router);

  public onAdd(): void {
    this.router.navigate(['/form/create_project']);
  }

  public onEdit(project: Project): void {
    this.router.navigate(['/form', project.id]);
  }

  public onDelete(id: string): void {
    // Update to use confirmation dialog
    if (confirm('Are you sure you want to delete this project')) {
      this.projectListStore.deleteProject(id);
    }
  }
}
