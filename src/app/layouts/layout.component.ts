import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { signOut } from "@firebase/auth";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async signOut() {
    await signOut(this.authService.getAuth());
    this.router.navigate(["auth"]);
  }
}
