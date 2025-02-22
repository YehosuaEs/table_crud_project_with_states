import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, ToggleButtonModule, ButtonModule, InputTextModule, TextareaModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  public form = input.required<FormGroup>();
  public formSubmit = output<void>();

  public onSubmit(): void {
    if (this.form().valid) {
      this.formSubmit.emit();
    }
  }
}
