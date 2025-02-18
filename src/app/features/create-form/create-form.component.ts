/* eslint-disable @typescript-eslint/member-ordering */
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Project } from '../list/interfaces/project.interface';
import { ProjectsStore } from '../list/store/project-list.store';

@Component({
  selector: 'app-create-form',
  imports: [ReactiveFormsModule, CardModule, ToggleButtonModule, ButtonModule, InputTextModule, TextareaModule],

  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent {
  public readonly projectListStore = inject(ProjectsStore);

  private readonly router: Router = inject(Router);
  public projectForm: FormGroup = this.initForm();

  private initForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      status: new FormControl('', [])
    });
  }
  public onSubmit(): void {
    if (this.projectForm.valid) {
      const newProject: Project = {
        id: crypto.randomUUID(),
        ...this.projectForm.value
      };
      this.projectListStore.addProject(newProject);
      this.router.navigate(['/projects']);
    }
  }
}
