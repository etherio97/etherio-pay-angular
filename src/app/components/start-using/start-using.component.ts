import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-start-using',
  templateUrl: './start-using.component.html',
})
export class StartUsingComponent {
  @Input() token = '';
  @Input() close = (): any => null;
  @Input() reload = (): any => null;
  @Input() signOut = (): any => null;

  loading = false;

  constructor(private account: AccountService) {}

  startUsing(): void {
    this.loading = true;
    this.account
      .startUsingEtherioPay()
      .toPromise()
      .then(() => {
        this.reload();
        this.close();
      })
      .catch((e) => alert(e.message));
  }

  changeAccount(): void {
    this.signOut();
    this.close();
  }
}
