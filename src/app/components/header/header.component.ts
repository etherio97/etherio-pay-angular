import { Component, Input } from '@angular/core';

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

  num(v: any) {
    return v === null
      ? ''
      : (typeof v === 'string' ? parseInt(v) : v).toLocaleString();
  }
}
