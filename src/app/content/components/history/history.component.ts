import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { Test } from '../../models/test';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  history$!: Observable<Test[]>;

  constructor(private apiService: ApiService) {
    this.history$ = this.apiService.loadHistory();
  }

}
