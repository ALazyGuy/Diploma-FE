import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let req = request;

    if(token) {
      req = req.clone({
        headers: req.headers.set('token', token)
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if(err.status === 403) {
          this.apiService.clearUserData();
        }

        return throwError(err);
      })
    );
  }
}
