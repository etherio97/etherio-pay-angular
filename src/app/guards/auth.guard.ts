import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? true : this.router.createUrlTree(["auth"]);
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
  }
}
