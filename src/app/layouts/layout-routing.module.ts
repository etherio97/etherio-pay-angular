import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../pages/guards/auth.guard';
import { HomeComponent } from '../pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BannerComponent } from '../pages/home/banner/banner.component';
import { HeaderComponent } from '../components/header/header.component';
import { FeatureButtonsComponent } from '../components/feature-buttons/feature-buttons.component';
import { TransferComponent } from '../pages/transfer/transfer.component';
import { BackButtonComponent } from '../components/back-button/back-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../pages/transfer/confirm-dialog/confirm-dialog.component';
import { RecievedComponent } from '../pages/history/recieved/recieved.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SentComponent } from '../pages/history/sent/sent.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AccountService } from '../shared/account.service';
import { ScanComponent } from '../pages/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { GiftCardsComponent } from '../pages/gift-cards/gift-cards.component';
import { GiftCardComponent } from '../pages/gift-cards/gift-card/gift-card.component';
import { GiftCardService } from '../shared/gift-card.service';
import { GiftCardDetailComponent } from '../pages/gift-cards/gift-card-detail/gift-card-detail.component';
import { StartUsingComponent } from '../components/start-using/start-using.component';
import { ProfileComponent } from '../pages/profile/profile.component';
import { FeatureButtonComponent } from '../components/feature-button/feature-button.component';

const routes: Routes = [
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
];

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    BannerComponent,
    HeaderComponent,
    FeatureButtonComponent,
    FeatureButtonsComponent,
    TransferComponent,
    BackButtonComponent,
    ConfirmDialogComponent,
    RecievedComponent,
    SentComponent,
    ScanComponent,
    GiftCardsComponent,
    GiftCardComponent,
    GiftCardDetailComponent,
    StartUsingComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    CarouselModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ZXingScannerModule,
  ],
  exports: [RouterModule],
  providers: [AccountService, GiftCardService],
})
export class LayoutRoutingModule {}
