import { Component, OnInit } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.scss"],
})
export class BannerComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    // rewind: true,
    nav: false,
    center: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  items = [
    "https://www.medialogic.com/wp-content/uploads/2019/12/ML-DEC2019-Apple-Card-TW.jpg",
    "https://static.vecteezy.com/system/resources/previews/001/868/707/non_2x/credit-card-online-payment-concept-banner-free-vector.jpg",
    "https://image.freepik.com/free-vector/banner-concept-online-payment-with-notification-if-payment-is-successful-screen_129685-322.jpg",
  ];

  constructor() {}

  ngOnInit(): void {}
}
