import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <header class="fixed top-0 right-0 left-0 h-16 bg-slate-800 border-b border-slate-700 z-50">
      <div class="h-full px-6 flex items-center justify-between">
        <div class="flex items-center">
          <h1 class="text-white text-xl font-bold">SmartHR</h1>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Search Bar -->
          <input type="text" placeholder="Search..." 
                 class="hidden md:block px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500">
          
          <!-- Notification bell -->
          <button class="relative p-2 text-slate-400 hover:text-white transition-colors">
            🔔
            <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <!-- Dark mode toggle -->
          <button (click)="toggleDarkMode()" class="p-2 text-slate-400 hover:text-white transition-colors">
            🌙
          </button>

          <!-- Profile Dropdown -->
          <div class="relative">
            <button (click)="toggleProfileMenu()" class="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-700 transition-colors">
              <div class="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {{ getUserInitial() }}
              </div>
              <span class="hidden md:block text-white text-sm">{{ currentUserEmail }}</span>
              <span class="text-slate-400">▼</span>
            </button>

            <!-- Dropdown Menu -->
            <div *ngIf="showProfileMenu" class="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600 rounded-lg shadow-lg">
              <a href="#" class="block px-4 py-2 text-white hover:bg-slate-600 first:rounded-t-lg">Profile</a>
              <a href="#" class="block px-4 py-2 text-white hover:bg-slate-600">Settings</a>
              <div class="border-t border-slate-600"></div>
              <button (click)="logout()" class="w-full text-left px-4 py-2 text-red-400 hover:bg-slate-600 last:rounded-b-lg">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  `,
    styles: []
})
export class HeaderComponent implements OnInit {
    showProfileMenu = false;
    currentUserEmail = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        const user = this.authService.getCurrentUser();
        this.currentUserEmail = user?.email || 'User';
    }

    getUserInitial(): string {
        return this.currentUserEmail.charAt(0).toUpperCase();
    }

    toggleProfileMenu() {
        this.showProfileMenu = !this.showProfileMenu;
    }

    toggleDarkMode() {
        // Dark mode is default, can be toggled if needed
        console.log('Dark mode toggle');
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
