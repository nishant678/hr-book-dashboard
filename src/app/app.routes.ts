import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login.component';
import { SUPER_ADMIN_ROUTES } from './features/super-admin/routes';
import { COMPANY_ADMIN_ROUTES } from './features/company-admin/routes';
import { UserRole } from './models';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'super-admin',
    canActivate: [roleGuard],
    data: { roles: [UserRole.MASTER_ADMIN] },
    children: SUPER_ADMIN_ROUTES
  },
  {
    path: 'company-admin',
    canActivate: [roleGuard],
    data: { roles: [UserRole.COMPANY_ADMIN] },
    children: COMPANY_ADMIN_ROUTES
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
