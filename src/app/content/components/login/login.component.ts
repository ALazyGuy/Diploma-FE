import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginRequest } from '../../models/login-request';
import { ApiService } from 'src/app/core/service/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private toastr: ToastrService) {}

  login(): void {
    if(!this.formGroup.valid) {
      this.toastr.error('Не все поля были заполнены', 'Ошибка авторизации');
      return;
    }

    const dto: LoginRequest = this.formGroup.value;

    this.apiService.login(dto).subscribe(data => {
      if(data) {
        this.toastr.error('Неверный логин или пароль', 'Ошибка авторизации')
      } else {
        this.router.navigateByUrl('/news');
      }
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

}
