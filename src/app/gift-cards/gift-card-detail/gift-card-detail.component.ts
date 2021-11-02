import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";
import {
  GiftCardResponse,
  GiftCardService,
} from "src/app/shared/gift-card.service";

@Component({
  selector: "app-gift-card-detail",
  templateUrl: "./gift-card-detail.component.html",
})
export class GiftCardDetailComponent implements OnInit {
  private token = "";
  giftCards: GiftCardResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private gift: GiftCardService
  ) {}

  async ngOnInit() {
    this.token = (await this.auth.getCurrentUser()?.getIdToken()) || "";

    this.route.params.subscribe(({ id }) => {
      this.gift.getAll(id, this.token).subscribe((data) => {
        this.giftCards = data;
      });
    });
  }
}
