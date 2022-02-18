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

  num(v: null | number | string) {
    return v === null
      ? ''
      : (typeof v === 'string' ? parseInt(v) : v).toLocaleString();
  }
}
