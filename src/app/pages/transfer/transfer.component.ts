import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
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
  options = [10000, 50000, 100000, 500000];
  accountError = false;
  transactionError = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService
      .getAuth()
      .currentUser?.getIdToken()
      .then((token) => {
        this.token = token;
        if (this.recipient) {
          this.searchAccount();
        }
      });

    this.route.queryParams.subscribe(({ recipient, amount }) => {
      this.recipient = recipient || '';
      this.amount = amount || 0;
    });
  }

  searchAccount(): void {
    const identifier = '+959' + this.recipient;
    const headers = {
      authorization: `Bearer ${this.token}`,
      'content-type': 'application/json',
    };
    this.accounts = [];
    this.recipientId = '';
    this.accountError = false;
    this.http
      .post(
        'https://etherio-pay.herokuapp.com/account/identify',
        { identifier },
        { headers }
      )
      .toPromise()
      .then((accounts: any) => {
        this.accounts = accounts;
        if (accounts.length) {
          this.recipientId = accounts[0];
        } else {
          this.accountError = true;
        }
      });
  }

  selectAmount(amount: number): void {
    this.amount = amount;
  }

  sendTransfer(): void {
    const modal = this.dialog.open(ConfirmDialogComponent);
    modal.componentInstance.confirm = () => this.confirmTransfer();
  }

  confirmTransfer(): void {
    const recipientId = this.recipientId;
    const headers = {
      authorization: `Bearer ${this.token}`,
      'content-type': 'application/json',
    };
    const amount = this.amount;
    this.accountError = false;
    this.http
      .post(
        'https://etherio-pay.herokuapp.com/transfer',
        { recipientId, amount },
        { headers }
      )
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.transactionError = err.error?.error;
      });
  }

  private isValid(phone: string) {
    return phone.match(/^(0|\+95)9[2-9][0-9]{6,9}$/);
  }
}
