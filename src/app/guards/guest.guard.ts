import { Injectable } from "@angular/core";
import { CanActivateChild, Router, UrlTree } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Injectable({
  providedIn: "root",
})
export class GuestGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? this.router.createUrlTree([""]) : true;
  }
}
