import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from './transfer.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
})
export class TransferComponent implements OnInit {
  recipient = '';
  recipientId = '';
  token = '';
  accounts: string[] = [];
  amount = 0;
  note = '';
  options = [10000, 50000, 100000, 500000];
  accountError = false;
  transactionError = '';

  constructor(
    private _transferService: TransferService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ recipient, amount }) => {
      this.recipient = recipient || '';
      this.amount = amount || '';
    });
  }

  searchAccount(): void {
    const identifier = this.recipientMsisdn;
    this.accounts = [];
    this.recipientId = '';
    this.accountError = false;
    this._transferService
      .findAccounts(identifier)
      .subscribe((accounts: any) => {
        this.accounts = accounts;
        if (accounts.length) {
          this.recipientId = accounts[0];
        } else {
          this.accountError = true;
        }
      });
  }

  selectAmount(amount: number | string): void {
    this.amount = typeof amount === 'string' ? parseInt(amount) : amount;
  }

  sendTransfer(): void {
    const modal = this.dialog.open(ConfirmDialogComponent);
    modal.componentInstance.confirm = () => this.confirmTransfer();
  }

  confirmTransfer(): void {
    this.accountError = false;
    if (typeof this.amount === 'string') {
      this.amount = parseInt(this.amount);
    }
    this._transferService
      .sendTransfer({
        amount: this.amount,
        recipientId: this.recipientId,
        note: this.note,
      })
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          this.transactionError = err.error?.error || 'Something went wrong!';
        }
      );
  }

  private isValid(phone: string) {
    return phone.match(/^(0|\+95)9[2-9][0-9]{6,9}$/);
  }

  get recipientMsisdn() {
    let recipient: string = this.recipient;
    if (recipient.slice(0, 1) === '+') return recipient;
    if (recipient.slice(0, 2) === '09') return `+959${recipient.slice(2)}`;
    return `+${recipient}`;
  }
}
