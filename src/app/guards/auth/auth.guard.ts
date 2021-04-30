import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const raw = localStorage.getItem('token');
    if (raw && JSON.parse(raw)) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }
}
