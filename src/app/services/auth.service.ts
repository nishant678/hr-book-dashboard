import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): boolean {
    localStorage.setItem(this.tokenKey, 'demo-token');
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
