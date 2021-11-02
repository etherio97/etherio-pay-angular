import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";
import {
  GiftCardPackageResponse,
  GiftCardService,
} from "../shared/gift-card.service";

@Component({
  selector: "app-gift-cards",
  templateUrl: "./gift-cards.component.html",
})
export class GiftCardsComponent implements OnInit {
  private token!: string;

  giftCards: GiftCardPackageResponse[] = [];

  constructor(
    private authService: AuthService,
    private giftCardService: GiftCardService
  ) {}

  async ngOnInit() {
    this.token = (await this.authService.getCurrentUser()?.getIdToken()) || "";
    this.giftCardService.getAllPackages(this.token).subscribe((data) => {
      this.giftCards = data;
    });
  }
}
