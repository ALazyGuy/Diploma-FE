import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanLoad {
  
  constructor(private apiService: ApiService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.handle();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
    return this.handle();
  }

  private handle(): Observable<boolean> {
    return this.apiService.getUserInfo().pipe(
      take(1),
      map(user => {
        if(!!user) {
          return true;
        }

        this.router.navigateByUrl('/login');
        return false;
      })
    );
  }
}
