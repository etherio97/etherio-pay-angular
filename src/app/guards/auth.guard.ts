import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../shared/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser) {
      return this.router.createUrlTree(["auth"]);
    }
    return true;
  }
}
