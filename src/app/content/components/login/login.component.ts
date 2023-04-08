import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {}

  login(): void {
    const dto: LoginRequest = this.formGroup.value;

    this.apiService.login(dto).subscribe(data => {
      this.router.navigateByUrl('/news');
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
