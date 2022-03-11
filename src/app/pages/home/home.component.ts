import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';
import { Observable } from 'rxjs';
import { StartUsingComponent } from 'src/app/components/start-using/start-using.component';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  isVisibleBalance: boolean = false;

  banners: string[] = [
    './assets/img/banner-1.jpg',
    './assets/img/banner-2.jpg',
    './assets/img/banner-3.jpg',
  ];

  identifier: string = '';

  balance: number = 0;

  startUsingModal: MatDialogRef<StartUsingComponent>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private realtime: RealtimeService,
    private balanceService: BalanceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.getCurrentUser();
    this.identifier =
      user.phoneNumber?.replace(/^\+95/, '0') ||
      user.displayName ||
      user.email ||
      user.uid;
    this.balanceService.reload().subscribe((balance) => {
      if (balance === null) this.askStartUsingEtherioPay();
      else this.balance = balance;
    });
    this.realtime.on('balance', () => {
      this.reload();
      this.snackbar.open('You have new notification!', null, {
        duration: 5000,
      });
    });
  }

  reload() {
    this.balanceService.reload().subscribe((balance) => {
      this.balance = balance;
    });
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
      this.startUsingModal.componentInstance.reload = () => this.reload();
      this.startUsingModal.componentInstance.signOut = () => this.signOut();
    }
  }

  ngOnDestroy(): void {}

  async signOut() {
    await signOut(this.auth.getAuth());
    this.router.navigate(['login']);
  }
}
