import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  register(): void {
      const dto: LoginRequest = {
        username: this.formGroup.controls['username'].value,
        password: this.formGroup.controls['password'].value
      };

      this.apiService.register(dto).subscribe(data => data && alert("Conflict"));
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]]
    });
  }

}
