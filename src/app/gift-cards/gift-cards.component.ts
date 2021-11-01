import { Component, OnInit } from "@angular/core";

export interface GiftCard {
  title: string;
  image: string;
  price: number;
}

@Component({
  selector: "app-gift-cards",
  templateUrl: "./gift-cards.component.html",
})
export class GiftCardsComponent implements OnInit {
  giftCards: Array<GiftCard> = [
    {
      title: "Steam Gift Card - USD5",
      price: 11000,
      image: "assets/img/gift-cards/steam.jpg",
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
