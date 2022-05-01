import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input()
  balance: number;

  @Input()
  identifier: string;

  isVisibleBalance = false;

  constructor(private dialog: MatDialog) {}

  num(v: any) {
    return v === null
      ? ''
      : (typeof v === 'string' ? parseInt(v) : v).toLocaleString();
  }
}
