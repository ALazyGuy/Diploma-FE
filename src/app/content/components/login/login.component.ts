import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder) {}

  login(): void {
    alert(`${this.formGroup.controls['login'].value}:${this.formGroup.controls['password'].value}`);
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
