/* eslint-disable @typescript-eslint/member-ordering */
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { Project } from '../list/interfaces/project.interface';
import { ProjectsStore } from '../list/store/project-list.store';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-form-handler',
  imports: [CardModule, FormComponent],
  providers: [ProjectsStore],
  templateUrl: './form-handler.component.html',
  styleUrl: './form-handler.component.scss'
})
export class FormHandlerComponent {
  private readonly projectListStore = inject(ProjectsStore);
  private readonly activateRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  public projectId = signal(this.activateRoute.snapshot.paramMap.get('id'));
  public isEditMode = computed((): boolean => !!this.projectId());
  public project = computed((): Project | null => {
    const projectsData = this.projectListStore.projectsData();
    const project = projectsData?.find(project => project?.id === this.projectId());
    return project ? project : null;
  });
  public form = linkedSignal({
    source: (): Project | null => this.project(),
    computation: (): FormGroup => {
      const projectFormInit = this.initForm();
      const project = this.project();
      return project ? this.patchValuesInForm(project, projectFormInit) : projectFormInit;
    }
  });

  public handleSubmit(): void {
    if (this.isEditMode() && this.project()) {
      const updatedProject: Project = {
        id: this.project()?.id,
        ...this.form().value
      };
      this.projectListStore.updateProject({
        id: updatedProject.id,
        updatedProject
      });
    } else {
      const newProject: Project = {
        id: crypto.randomUUID(),
        ...this.form().value
      };
      this.projectListStore.addProject(newProject);
    }
    this.navigateTOProjectList();
  }

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      status: new FormControl('', [])
    });
  }

  private patchValuesInForm(project: Project, projectForm: FormGroup): FormGroup {
    projectForm.patchValue(project);
    return projectForm;
  }

  private navigateTOProjectList(): void {
    this.router.navigate(['/projects']);
  }
}
