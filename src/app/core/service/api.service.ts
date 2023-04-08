import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap} from 'rxjs';
import { JwtResponse } from 'src/app/content/models/jwt-response';
import { LoginRequest as AuthRequest } from 'src/app/content/models/login-request';
import { UserInfo } from 'src/app/content/models/user-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly userInfo$: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null); 

  constructor(private httpClient: HttpClient) { }

  loadUserInfo(): void {
    this.httpClient.get<UserInfo>(`${environment.apiUrl}user/info`).pipe(
      tap(data => this.userInfo$.next(data))
    );
  }

  getUserInfo(): BehaviorSubject<UserInfo | null>{
    return this.userInfo$;
  }

  register(dto: AuthRequest): Observable<string | undefined> {
    return this.httpClient.post<JwtResponse>(`${environment.apiUrl}user/register`, dto).pipe(
      map(data => this.saveToken(data))
    );
  }

  login(dto: AuthRequest): Observable<void> {
    return this.httpClient.post<JwtResponse>(`${environment.apiUrl}user/login`, dto).pipe(
      map(data => this.saveToken(data))
    );
  }

  saveToken(token: any){
    if(token.token){
      localStorage.setItem('token', token.token);
      this.loadUserInfo();
    }
    
    return token?.type
  }

  clearUserData() {
    this.userInfo$.next(null);
    localStorage.removeItem('token');
  }

}
