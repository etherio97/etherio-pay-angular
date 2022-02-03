import { Component, Input } from "@angular/core";

@Component({
  selector: "app-gift-card",
  templateUrl: "./gift-card.component.html",
})
export class GiftCardComponent {
  @Input() title = "";
  @Input() price = 0;
  @Input() image = "";
}
