import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getIdToken, signOut } from '@firebase/auth';
import { AccountService } from '../../shared/account.service';
import { AuthService } from '../../shared/auth.service';
import { StartUsingComponent } from '../../components/start-using/start-using.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  token = '';
  balance = '';
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
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.auth.getCurrentUser();
    if (user) {
      this.token = await getIdToken(user);
      this.identifier =
        user.phoneNumber?.replace(/^\+95/, '0') ||
        user.displayName ||
        user.email ||
        user.uid;

      await this.reloadData();

      if (this.balance === '') {
        this.balance = '0';
        const modal = this.dialog.open(StartUsingComponent, {
          disableClose: true,
        });
        modal.componentInstance.token = this.token;
        modal.componentInstance.close = () => modal.close();
        modal.componentInstance.reload = () => this.reloadData();
        modal.componentInstance.signOut = () => this.signOut();
      }
    }
  }

  async reloadData() {
    const { balance } = await this.account.getAccount(this.token).toPromise();
    if (balance !== null) {
      this.balance = balance.toLocaleString();
    }
  }

  async signOut() {
    await signOut(this.auth.getAuth());

    this.router.navigate(['auth']);
  }
}
