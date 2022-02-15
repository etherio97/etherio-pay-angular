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
    if (this.loading) return;
    this.loading = true;
    this.account
      .startUsingEtherioPay(this.token)
      .toPromise()
      .then(() => {
        this.reload();
        this.close();
        this.loading = false;
      })
      .catch((e) => alert(e.message));
  }

  changeAccount(): void {
    this.signOut();
    this.close();
  }
}
