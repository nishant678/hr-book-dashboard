import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@Component({
    selector: 'app-dashboard-layout',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    template: `
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <main class="ml-64 mt-16 p-6 bg-slate-900 min-h-screen">
      <router-outlet></router-outlet>
    </main>
  `,
    styles: []
})
export class DashboardLayoutComponent { }
