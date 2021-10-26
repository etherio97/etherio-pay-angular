import { Component, Input } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent {
  @Input()
  balance = "";

  @Input()
  identifier = "";

  isVisibleBalance = false;
}
