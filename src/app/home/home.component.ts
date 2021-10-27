import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getIdToken, signOut } from "@firebase/auth";
import { AccountService } from "../shared/account.service";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  token = "";
  balance = "";
  identifier = "";
  isVisibleBalance = false;
  banners = [
    "./assets/img/banner-1.jpg",
    "./assets/img/banner-2.jpg",
    "./assets/img/banner-3.jpg",
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private account: AccountService
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.token = await getIdToken(user);
      this.identifier =
        user.phoneNumber?.replace(/^\+95/, "0") ||
        user.displayName ||
        user.email ||
        user.uid;

      const { balance } = await this.account.getAccount(this.token).toPromise();

      this.balance = balance.toLocaleString();
    }
  }

  async signOut() {
    await signOut(this.auth.getAuth());

    this.router.navigate(["auth"]);
  }
}
