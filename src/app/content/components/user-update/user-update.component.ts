import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { UpdateRequest } from '../../models/update-request';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private toastr: ToastrService) {}

  update(): void {
    const dto: UpdateRequest = this.formGroup.value;

    this.apiService.updateUser(dto).subscribe();
  }

  deleteUser(){
    this.apiService.deleteUser().subscribe(date => {
      this.router.navigateByUrl('/news');
      this.toastr.success('Пользователь был удален');
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

}
