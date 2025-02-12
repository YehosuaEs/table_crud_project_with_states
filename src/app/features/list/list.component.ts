import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { TableProjectComponent } from './components/table-project/table-project.component';
import { Project } from './interfaces/project.interface';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-list',
  imports: [TableProjectComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  public projects: Project[] = [];
  // public projects = signal<Project[]>([]);

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .pipe(tap((data: Project[]): Project[] => (this.projects = data)))
      .subscribe();
  }

  public onEdit(project: Project): void {
    console.log('Edit project:', project);
  }

  public onDelete(name: string): void {
    // Update to use confirmation dialog
    if (confirm('Are you sure you want to delete this project')) {
      this.projectsService.deleteProject(name).subscribe();
    }
  }
}
