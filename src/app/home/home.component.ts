import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { getIdToken, signOut } from "@firebase/auth";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  balance = "";
  identifier = "";
  private token!: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    let user = await this.authService.getCurrentUser();
    if (user) {
      this.token = await getIdToken(user);
      const { balance, identifier } = await this.http
        .get<{ balance: number; identifier: string }>(
          "https://etherio-pay.herokuapp.com/account",
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        )
        .toPromise();
      this.balance = balance.toLocaleString();
      this.identifier = identifier;
    }
  }

  async signOut() {
    await signOut(this.authService.getAuth());
    window.location.reload();
  }
}
