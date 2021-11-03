import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import preload from '../helpers/preload';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean | UrlTree {
    preload();
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? true : this.router.createUrlTree(['auth']);
  }
}
