import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginResponse } from '../models';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    styles: [`
      :host {
        display: block;
      }

      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        padding: 1rem;
        position: relative;
        overflow: hidden;
      }

      .login-container::before {
        content: '';
        position: fixed;
        top: -200px;
        right: -200px;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(40px);
        pointer-events: none;
      }

      .login-container::after {
        content: '';
        position: fixed;
        bottom: -200px;
        left: -200px;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(40px);
        pointer-events: none;
      }

      .login-wrapper {
        width: 100%;
        max-width: 420px;
        position: relative;
        z-index: 10;
      }

      .login-card {
        background: rgba(30, 41, 59, 0.5);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(71, 85, 105, 0.3);
        border-radius: 1.5rem;
        padding: 2rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }

      .login-header {
        text-align: center;
        margin-bottom: 2.5rem;
      }

      .logo-box {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        border-radius: 0.75rem;
        margin-bottom: 1rem;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
      }

      .logo-box svg {
        width: 32px;
        height: 32px;
        color: white;
      }

      h1 {
        font-size: 2rem;
        font-weight: bold;
        background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        color: #94a3b8;
        font-size: 0.875rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .form-group {
        display: flex;
        flex-direction: column;
      }

      label {
        font-size: 0.875rem;
        font-weight: 600;
        color: #cbd5e1;
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      label svg {
        width: 1rem;
        height: 1rem;
        color: #a5b4fc;
      }

      input {
        padding: 0.75rem 1rem;
        background: rgba(51, 65, 85, 0.3);
        border: 1px solid rgba(71, 85, 105, 0.5);
        border-radius: 0.5rem;
        color: white;
        font-size: 0.95rem;
        transition: all 0.3s ease;
      }

      input::placeholder {
        color: #94a3b8;
      }

      input:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        background: rgba(51, 65, 85, 0.5);
      }

      input.error {
        border-color: #ef4444;
      }

      .error-message {
        color: #f87171;
        font-size: 0.75rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      .error-message svg {
        width: 0.75rem;
        height: 0.75rem;
      }

      .error-alert {
        padding: 1rem;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.3);
        border-radius: 0.5rem;
        display: flex;
        gap: 0.75rem;
      }

      .error-alert svg {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
        margin-top: 0.125rem;
        color: #f87171;
      }

      .error-alert p {
        color: #f87171;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .submit-btn {
        padding: 0.75rem 1rem;
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      .submit-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
      }

      .submit-btn:disabled {
        background: linear-gradient(135deg, #64748b 0%, #57606f 100%);
        cursor: not-allowed;
        opacity: 0.7;
      }

      .divider {
        position: relative;
        margin: 2rem 0;
      }

      .divider-line {
        height: 1px;
        background: rgba(71, 85, 105, 0.3);
      }

      .divider-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(30, 41, 59, 0.5);
        padding: 0 0.5rem;
        color: #64748b;
        font-size: 0.75rem;
      }

      .demo-cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .demo-card {
        padding: 1rem;
        background: rgba(51, 65, 85, 0.2);
        border: 1px solid rgba(71, 85, 105, 0.3);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .demo-card:hover {
        border-color: rgba(99, 102, 241, 0.5);
        background: rgba(51, 65, 85, 0.3);
      }

      .demo-label {
        color: #64748b;
        font-size: 0.625rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.5rem;
      }

      .demo-info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .demo-email {
        color: #e0e7ff;
        font-size: 0.75rem;
        font-family: monospace;
        word-break: break-all;
      }

      .demo-password {
        color: #cbd5e1;
        font-size: 0.75rem;
        font-family: monospace;
      }

      .footer-text {
        text-align: center;
        color: #475569;
        font-size: 0.75rem;
      }

      .help-link {
        text-align: center;
        margin-top: 1.5rem;
      }

      .help-link a {
        color: #64748b;
        text-decoration: none;
        font-size: 0.875rem;
        transition: color 0.3s ease;
      }

      .help-link a:hover {
        color: #a5b4fc;
      }

      .animate-spin {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `],
    template: `
    <div class="login-container">
      <div class="login-wrapper">
        <div class="login-card">
          <!-- Header -->
          <div class="login-header">
            <div class="logo-box">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <h1>SmartHR</h1>
            <p class="subtitle">Enterprise HR Management Solution</p>
          </div>

          <!-- Form -->
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <!-- Email Field -->
            <div class="form-group">
              <label>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email Address
              </label>
              <input type="email"
                     formControlName="email"
                     placeholder="Enter your email"
                     [class.error]="isFieldInvalid('email')">
              <p *ngIf="isFieldInvalid('email')" class="error-message">
                <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 15.586 7.313 12.899a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l8.5-8.5z" clip-rule="evenodd"/></svg>
                Valid email is required
              </p>
            </div>

            <!-- Password Field -->
            <div class="form-group">
              <label>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
                Password
              </label>
              <input [type]="showPassword ? 'text' : 'password'"
                     formControlName="password"
                     placeholder="Enter your password"
                     [class.error]="isFieldInvalid('password')">
              <p *ngIf="isFieldInvalid('password')" class="error-message">
                <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18.101 12.93a1 1 0 00-1.414-1.414L10 15.586 7.313 12.899a1 1 0 00-1.414 1.414l3.5 3.5a1 1 0 001.414 0l8.5-8.5z" clip-rule="evenodd"/></svg>
                Password is required
              </p>
            </div>

            <!-- Error Alert -->
            <div *ngIf="errorMessage" class="error-alert">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <p>{{ errorMessage }}</p>
            </div>

            <!-- Submit Button -->
            <button type="submit"
                    [disabled]="loginForm.invalid || isLoading"
                    class="submit-btn">
              <svg *ngIf="!isLoading" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1.25rem; height: 1.25rem;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <svg *ngIf="isLoading" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 1.25rem; height: 1.25rem;" class="animate-spin">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isLoading ? 'Signing in...' : 'Sign In' }}</span>
            </button>
          </form>

          <!-- Divider -->
          <div class="divider">
            <div class="divider-line"></div>
            <div class="divider-text">Demo Credentials</div>
          </div>

          <!-- Demo Cards -->
          <div class="demo-cards">
            <div class="demo-card">
              <div class="demo-label">Master Admin</div>
              <div class="demo-info">
                <div class="demo-email">master@system.com</div>
                <div class="demo-password">admin123</div>
              </div>
            </div>
            <div class="demo-card">
              <div class="demo-label">Company Admin</div>
              <div class="demo-info">
                <div class="demo-email">admin@company.com</div>
                <div class="demo-password">admin123</div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <p class="footer-text">© 2024 SmartHR. All rights reserved.</p>
        </div>

        <!-- Help Link -->
        <div class="help-link">
          <a href="#">Need help logging in?</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
    loginForm: FormGroup;
    isLoading = false;
    errorMessage = '';
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['master@system.com', [Validators.required, Validators.email]],
            password: ['admin123', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';

        const { email, password } = this.loginForm.value;
        this.authService.login(email, password)
            .pipe(
                finalize(() => {
                    console.log('login finalized, clearing loading');
                    this.isLoading = false;
                })
            )
            .subscribe({
                next: (response: LoginResponse) => {
                    console.log('login success', response);
                    // Route based on role
                    if (response.role === 'MASTER_ADMIN') {
                        this.router.navigate(['/super-admin']);
                    } else {
                        this.router.navigate(['/company-admin']);
                    }
                },
                error: (error: any) => {
                    console.error('Login error:', error);
                    // Better error messages
                    if (error.status === 0) {
                        this.errorMessage = 'Cannot connect to server. Please check your internet connection.';
                    } else if (error.status === 401) {
                        this.errorMessage = 'Invalid email or password.';
                    } else if (error.status === 404) {
                        this.errorMessage = 'Login service not available.';
                    } else if (error.error?.message) {
                        this.errorMessage = error.error.message;
                    } else {
                        this.errorMessage = 'Login failed. Please try again.';
                    }
                }
            });
    }

    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }
}
