import { Component, Input } from "@angular/core";
import { OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
})
export class BannerComponent {
  @Input() banners: string[] = [];

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
}
