import { Location } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-back-button",
  templateUrl: "./back-button.component.html",
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
