import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface NavItem {
    label: string;
    route: string;
    icon: string;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    template: `
    <div class="fixed left-0 top-16 bottom-0 w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
      <nav class="p-4 space-y-2">
        <a *ngFor="let item of navItems"
           [routerLink]="item.route"
           routerLinkActive="bg-indigo-600"
           [ngClass]="{
             'block px-4 py-3 rounded-lg text-white hover:bg-slate-700 transition-colors': true,
             'bg-indigo-600': isActive(item.route)
           }">
          <span class="mr-3">{{ item.icon }}</span>{{ item.label }}
        </a>
      </nav>
    </div>
  `,
    styles: []
})
export class SidebarComponent implements OnInit {
    navItems: NavItem[] = [];
    private currentRoute: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        const userRole = this.authService.getUserRole();

        if (userRole === 'MASTER_ADMIN') {
            this.navItems = [
                { label: 'Dashboard', route: '/super-admin', icon: '📊' },
                { label: 'Companies', route: '/super-admin/companies', icon: '🏢' },
                { label: 'Subscription Plans', route: '/super-admin/plans', icon: '💳' },
                { label: 'All Users', route: '/super-admin/users', icon: '👥' },
                { label: 'Attendance Overview', route: '/super-admin/attendance', icon: '📋' },
                { label: 'Leave Overview', route: '/super-admin/leaves', icon: '🏖️' },
                { label: 'Reports', route: '/super-admin/reports', icon: '📈' },
                { label: 'Settings', route: '/super-admin/settings', icon: '⚙️' }
            ];
        } else if (userRole === 'COMPANY_ADMIN') {
            this.navItems = [
                { label: 'Dashboard', route: '/company-admin', icon: '📊' },
                { label: 'Employees', route: '/company-admin/employees', icon: '👨‍💼' },
                { label: 'Roles', route: '/company-admin/roles', icon: '🔑' },
                { label: 'Attendance', route: '/company-admin/attendance', icon: '📋' },
                { label: 'Leave Management', route: '/company-admin/leaves', icon: '🏖️' },
                { label: 'Holidays', route: '/company-admin/holidays', icon: '🎉' },
                { label: 'Reports', route: '/company-admin/reports', icon: '📈' },
                { label: 'Settings', route: '/company-admin/settings', icon: '⚙️' }
            ];
        }
    }

    isActive(route: string): boolean {
        return this.router.url === route;
    }
}
