import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';
import { Observable } from 'rxjs';
import { BalanceService } from 'src/app/shared/services/balance.service';
import { RealtimeService } from 'src/app/shared/services/realtime.service';
import { StartUsingComponent } from '../../components/start-using/start-using.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  isVisibleBalance: boolean = false;

  banners: string[] = [
    './assets/img/banner-1.jpg',
    './assets/img/banner-2.jpg',
    './assets/img/banner-3.jpg',
  ];

  identifier: string = '';

  balance$: Observable<any>;

  startUsingModal: MatDialogRef<StartUsingComponent>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private realtime: RealtimeService,
    private balance: BalanceService,
    private snackbar: MatSnackBar,
    private changeDetection: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.getCurrentUser();
    this.identifier =
      user.phoneNumber?.replace(/^\+95/, '0') ||
      user.displayName ||
      user.email ||
      user.uid;
    this.balance$ = this.balance.reload();
    this.realtime.on('balance', () => {
      this.balance.reload().subscribe();
      this.snackbar.open('You have new notification!', null, {
        duration: 5000,
      });
      this.changeDetection.detectChanges();
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
