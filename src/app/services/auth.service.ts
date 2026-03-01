import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserInfo, UserRole } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://hr-spring-backend.onrender.com/api/auth';
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(this.getUserFromStorage());
  private tokenSubject = new BehaviorSubject<string | null>(this.getTokenFromStorage());

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const request: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, request).pipe(
      tap((response) => {
        this.storeToken(response.token);
        const userInfo: UserInfo = {
          id: response.id,
          email: response.email,
          role: response.role
        };
        this.storeUser(userInfo);
        this.currentUserSubject.next(userInfo);
        this.tokenSubject.next(response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  getUserRole(): UserRole | null {
    return this.currentUserSubject.value?.role || null;
  }

  isMasterAdmin(): boolean {
    return this.getUserRole() === UserRole.MASTER_ADMIN;
  }

  isCompanyAdmin(): boolean {
    return this.getUserRole() === UserRole.COMPANY_ADMIN;
  }

  private storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private getTokenFromStorage(): string | null {
    return localStorage.getItem('auth_token');
  }

  private storeUser(user: UserInfo): void {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  private getUserFromStorage(): UserInfo | null {
    const user = localStorage.getItem('auth_user');
    return user ? JSON.parse(user) : null;
  }
}
