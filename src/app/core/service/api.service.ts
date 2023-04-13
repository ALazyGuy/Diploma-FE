import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, finalize, map, skipUntil, tap, throwError} from 'rxjs';
import { JwtResponse } from 'src/app/content/models/jwt-response';
import { LoginRequest as AuthRequest } from 'src/app/content/models/login-request';
import { Test } from 'src/app/content/models/test';
import { UpdateRequest } from 'src/app/content/models/update-request';
import { UserInfo } from 'src/app/content/models/user-info';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly userInfo$: BehaviorSubject<UserInfo | null> = new BehaviorSubject<UserInfo | null>(null); 
  private readonly finished$: ReplaySubject<void> = new ReplaySubject();

  constructor(private httpClient: HttpClient) { }

  loadHistory(): Observable<Test[]> {
    return this.httpClient.get<Test[]>(`${environment.apiUrl}user/test`);
  }
  
  updateHistory(test: {ticket: number, result: number}) {
    return this.httpClient.put(`${environment.apiUrl}user/test`, test);
  }

  loadRulesById(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}rules/${id}`, {responseType: 'text'});
  }
  
  loadRulesNav(id: string): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}rules/nav/${id}`, {responseType: 'text'});
  }

  loadUserInfo(): Observable<UserInfo> {
    if(this.isAuthenticated()){
      return this.httpClient.get<UserInfo>(`${environment.apiUrl}user/info`).pipe(
        tap(data => {
          this.finished$.next();
          this.userInfo$.next(data);
        }),
        finalize(() => this.finished$.next())
      );
    }

    this.finished$.next();

    return throwError(null);
  }

  getUserInfo(): Observable<UserInfo | null>{
    return this.userInfo$.pipe(
      skipUntil(this.finished$)
    );
  }

  register(dto: AuthRequest): Observable<string | undefined> {
    return this.httpClient.post<JwtResponse>(`${environment.apiUrl}user/register`, dto).pipe(
      map(data => this.saveToken(data))
    );
  }

  login(dto: AuthRequest): Observable<string | undefined> {
    return this.httpClient.post<JwtResponse>(`${environment.apiUrl}user/login`, dto).pipe(
      map(data => this.saveToken(data))
    );
  }

  updateUser(dto: UpdateRequest): Observable<string | undefined> {
    return this.httpClient.put<JwtResponse>(`${environment.apiUrl}user/update`, dto).pipe(
      map(data => this.saveToken(data))
    );
  }

  deleteUser(): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}user/user`).pipe(
      tap(() => this.clearUserData())
    );
  }

  saveToken(token: any){
    if(token.token){
      localStorage.setItem('token', token.token);
      this.loadUserInfo().subscribe();
    }
    
    return token?.type;
  }

  clearUserData() {
    this.userInfo$.next(null);
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}
