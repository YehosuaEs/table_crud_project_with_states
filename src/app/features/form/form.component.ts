/* eslint-disable @typescript-eslint/member-ordering */
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Project } from '../list/interfaces/project.interface';
import { ProjectsStore } from '../list/store/project-list.store';
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CardModule, ToggleButtonModule, ButtonModule, InputTextModule, TextareaModule],
  providers: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  public readonly projectListStore = inject(ProjectsStore);
  private readonly activateRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  public projectForm: FormGroup = this.initForm();
  public projectId = signal(this.activateRoute.snapshot.paramMap.get('id'));
  public project = computed(() => {
    const projectsData = this.projectListStore.projectsData();
    if (projectsData && this.projectId()) {
      return projectsData.find(project => project.id === this.projectId());
    }
    return null;
  });

  ngOnInit(): void {
    this.patchValuesInForm();
  }

  private patchValuesInForm(): void {
    this.projectForm.patchValue(this.project() as Project);
  }

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', []),
      description: new FormControl('', []),
      status: new FormControl('', [])
    });
  }
  public onSubmit(): void {
    if (this.projectForm.valid && this.project()) {
      const updatedProject: Project = {
        id: this.project()?.id,
        ...this.projectForm.value
      };

      this.projectListStore.updateProject({
        id: updatedProject.id,
        updatedProject
      });
      this.router.navigate(['/projects']);
    }
  }
}
