import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/service/api.service';
import { UpdateRequest } from '../../models/update-request';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {

  formGroup: FormGroup = this.createFormGroup();

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  update(): void {
    const dto: UpdateRequest = this.formGroup.value;

    this.apiService.updateUser(dto).subscribe(data => {
      data && alert("Conflict");
    });
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

}
