import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { firebaseInitializer } from './firebase.init';
import { IconsModule } from './layout/icons/icons.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { HeaderComponent } from './components/header/header.component';
import { FeatureButtonComponent } from './components/feature-button/feature-button.component';
import { FeatureButtonsComponent } from './components/feature-buttons/feature-buttons.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { ConfirmDialogComponent } from './pages/transfer/confirm-dialog/confirm-dialog.component';
import { RecievedComponent } from './pages/history/recieved/recieved.component';
import { SentComponent } from './pages/history/sent/sent.component';
import { ScanComponent } from './pages/scan/scan.component';
import { GiftCardsComponent } from './pages/gift-cards/gift-cards.component';
import { GiftCardDetailComponent } from './pages/gift-cards/gift-card-detail/gift-card-detail.component';
import { GiftCardComponent } from './pages/gift-cards/gift-card/gift-card.component';
import { StartUsingComponent } from './components/start-using/start-using.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './pages/auth/auth.module';
import { AuthInterceptor } from './shared/auth/auth. interceptor';

@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
    HttpClientModule,
    LayoutModule,
    AuthModule,
    MatButtonModule,
    MatIconModule,
    IconsModule,
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
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: firebaseInitializer,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
