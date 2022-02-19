import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { StartUsingComponent } from '../../components/start-using/start-using.component';
import { AuthService } from '../../shared/services/auth.service';

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
  startUsingModal: any;

  constructor(
    private auth: AuthService,
    private router: Router,
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
    if (!this.startUsingModal) {
      this.startUsingModal = this.dialog.open(StartUsingComponent, {
        disableClose: true,
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
      });
      this.startUsingModal.componentInstance.close = () =>
        this.startUsingModal.close();
      this.startUsingModal.componentInstance.reload = () =>
        this.balance.reload().subscribe();
      this.startUsingModal.componentInstance.signOut = () => this.signOut();
    }
  }

  ngOnDestroy(): void {}

  async signOut() {
    await signOut(this.auth.getAuth());
    this.router.navigate(['login']);
  }
}
