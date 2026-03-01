import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../../layout/components/dashboard-layout.component';
import { SuperAdminDashboardComponent } from './dashboard.component';

export const SUPER_ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                component: SuperAdminDashboardComponent
            },
            // Add more routes for companies, users, etc.
            {
                path: 'companies',
                component: SuperAdminDashboardComponent // Placeholder
            },
            {
                path: 'users',
                component: SuperAdminDashboardComponent // Placeholder
            },
            {
                path: 'attendance',
                component: SuperAdminDashboardComponent // Placeholder
            },
            {
                path: 'leaves',
                component: SuperAdminDashboardComponent // Placeholder
            },
            {
                path: 'reports',
                component: SuperAdminDashboardComponent // Placeholder
            },
            {
                path: 'settings',
                component: SuperAdminDashboardComponent // Placeholder
            }
        ]
    }
];
