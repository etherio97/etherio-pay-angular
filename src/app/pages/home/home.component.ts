import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getIdToken, signOut } from '@firebase/auth';
import { AccountService } from '../../shared/services/account.service';
import { AuthService } from '../../shared/services/auth.service';
import { StartUsingComponent } from '../../components/start-using/start-using.component';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { BalanceService } from 'src/app/shared/services/balance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  identifier = '';
  isVisibleBalance = false;
  banners = [
    './assets/img/banner-1.jpg',
    './assets/img/banner-2.jpg',
    './assets/img/banner-3.jpg',
  ];

  constructor(
    private auth: AuthService,
    private router: Router,
    private account: AccountService,
    private dialog: MatDialog,
    private realtime: RealtimeService,
    private balance: BalanceService
  ) {}

  balance$: any;

  async ngOnInit(): Promise<void> {
    const user = this.auth.getCurrentUser();

    this.identifier =
      user.phoneNumber?.replace(/^\+95/, '0') ||
      user.displayName ||
      user.email ||
      user.uid;
    this.balance$ = this.balance.reload();
    this.realtime.on('balance', () => this.balance.reload().subscribe());
  }

  askStartUsingEtherioPay() {
    // this.balance = '0';
    const modal = this.dialog.open(StartUsingComponent, {
      disableClose: true,
    });
    modal.componentInstance.close = () => modal.close();
    modal.componentInstance.reload = () => this.balance.reload().subscribe();
    modal.componentInstance.signOut = () => this.signOut();
  }

  ngOnDestroy(): void {}

  async signOut() {
    await signOut(this.auth.getAuth());
    this.router.navigate(['login']);
  }
}
