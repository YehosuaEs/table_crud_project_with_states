import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Project } from './interfaces/project.interface';
import { ProjectsService } from './services/projects.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  public projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService
      .getProjects()
      .pipe(tap((data: Project[]): Project[] => (this.projects = data)))
      .subscribe();
  }
}
