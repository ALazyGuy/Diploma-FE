import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userinfo$ = this.apiService.getUserInfo();

  constructor(private apiService: ApiService, private router: Router){}

  logout() {
    this.apiService.clearUserData();
    this.router.navigateByUrl('/news');
  }

}
