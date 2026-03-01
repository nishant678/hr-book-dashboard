import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../../layout/components/dashboard-layout.component';
import { CompanyAdminDashboardComponent } from './dashboard.component';

export const COMPANY_ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                component: CompanyAdminDashboardComponent
            },
            // Add more routes for employees, attendance, leaves, etc.
            {
                path: 'employees',
                component: CompanyAdminDashboardComponent // Placeholder
            },
            {
                path: 'roles',
                component: CompanyAdminDashboardComponent // Placeholder
            },
            {
                path: 'attendance',
                component: CompanyAdminDashboardComponent // Placeholder
            },
            {
                path: 'leaves',
                component: CompanyAdminDashboardComponent // Placeholder
            },
            {
                path: 'holidays',
                component: CompanyAdminDashboardComponent // Placeholder
            },
            {
                path: 'reports',
                component: CompanyAdminDashboardComponent // Placeholder
            },
            {
                path: 'settings',
                component: CompanyAdminDashboardComponent // Placeholder
            }
        ]
    }
];
