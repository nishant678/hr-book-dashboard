import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const requiredRoles: UserRole[] = route.data['roles'];

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
            return false;
        }

        const userRole = this.authService.getUserRole();
        if (userRole && requiredRoles.includes(userRole)) {
            return true;
        }

        // Redirect based on role
        if (userRole === UserRole.MASTER_ADMIN) {
            this.router.navigate(['/super-admin']);
        } else {
            this.router.navigate(['/company-admin']);
        }
        return false;
    }
}
