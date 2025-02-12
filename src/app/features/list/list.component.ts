import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableProjectComponent } from './components/table-project/table-project.component';
import { Project } from './interfaces/project.interface';
import { ProjectsStore } from './store/project-list.store';

@Component({
  selector: 'app-list',
  imports: [TableProjectComponent, CommonModule],
  providers: [ProjectsStore],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  public readonly projectListStore = inject(ProjectsStore);

  public onEdit(project: Project): void {
    console.log('Edit project:', project);
  }

  public onDelete(id: string): void {
    // Update to use confirmation dialog
    if (confirm('Are you sure you want to delete this project')) {
      this.projectListStore.deleteProject(id);
    }
  }
}
