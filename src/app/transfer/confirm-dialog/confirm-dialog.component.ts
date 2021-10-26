import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
})
export class ConfirmDialogComponent {
  @Output() confirm!: Function;
}
