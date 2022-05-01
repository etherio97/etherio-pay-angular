import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { GiftCardDetailComponent } from './pages/gift-cards/gift-card-detail/gift-card-detail.component';
import { GiftCardsComponent } from './pages/gift-cards/gift-cards.component';
import { AuthGuard } from './guards/auth.guard';
import { RecievedComponent } from './pages/history/recieved/recieved.component';
import { SentComponent } from './pages/history/sent/sent.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ScanComponent } from './pages/scan/scan.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'transfer',
        component: TransferComponent,
      },
      {
        path: 'recieved',
        component: RecievedComponent,
      },
      {
        path: 'sent',
        component: SentComponent,
      },
      {
        path: 'scan',
        component: ScanComponent,
      },
      {
        path: 'gifts',
        component: GiftCardsComponent,
      },
      {
        path: 'gifts/:id',
        component: GiftCardDetailComponent,
      },
      {
        path: 'account',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
];
