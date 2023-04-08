import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, map, tap } from 'rxjs';
import { ApiService } from '../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate, CanLoad {
  
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
      map(user => !user),
      tap(isAnonymous => {
        if (!isAnonymous) {
          this.router.navigateByUrl('/news');
        }
      })
    );
  }
}
