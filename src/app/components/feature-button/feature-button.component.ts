import { Component, Input } from "@angular/core";

@Component({
  selector: "app-feature-button",
  templateUrl: "./feature-button.component.html",
})
export class FeatureButtonComponent {
  @Input()
  title = "";

  @Input()
  to = "";
}
