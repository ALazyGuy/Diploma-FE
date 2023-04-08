import { Component, OnInit } from '@angular/core';
import { ApiService } from './core/service/api.service';
import { EMPTY, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private apiService: ApiService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.apiService.loadUserInfo().pipe(
      catchError(() => {
        this.router.navigateByUrl('/news');
        return EMPTY;
      })
    ).subscribe(() => {
      if(this.router.url === '/'){
        this.router.navigateByUrl('/news')
      }
    });
  }

}
