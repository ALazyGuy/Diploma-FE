import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder) {}

  register(): void {
    alert(`${this.formGroup.controls['login'].value}:${this.formGroup.controls['password'].value}:${this.formGroup.controls['rePassword'].value}`);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]]
    });
  }

}
