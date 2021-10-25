import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { getIdToken } from "@firebase/auth";
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

  constructor(private authService: AuthService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.token = await getIdToken(user);
      this.identifier =
        user.phoneNumber?.replace(/^\+95/, "0") ||
        user.displayName ||
        user.email ||
        user.uid;

      const { balance } = await this.http
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
    }
  }

  toggleVisibleBalance() {
    this.isVisibleBalance = !this.isVisibleBalance;
  }
}
