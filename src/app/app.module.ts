import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AppComponent } from './app.component';
import { routes } from './app.routing';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { FeatureButtonComponent } from './components/feature-button/feature-button.component';
import { FeatureButtonsComponent } from './components/feature-buttons/feature-buttons.component';
import { HeaderComponent } from './components/header/header.component';
import { StartUsingComponent } from './components/start-using/start-using.component';
import { firebaseInitializer } from './firebase.init';
import { IconsModule } from './layout/icons/icons.module';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './pages/auth/auth.module';
import { GiftCardDetailComponent } from './pages/gift-cards/gift-card-detail/gift-card-detail.component';
import { GiftCardComponent } from './pages/gift-cards/gift-card/gift-card.component';
import { GiftCardsComponent } from './pages/gift-cards/gift-cards.component';
import { RecievedComponent } from './pages/history/recieved/recieved.component';
import { SentComponent } from './pages/history/sent/sent.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ScanComponent } from './pages/scan/scan.component';
import { ConfirmDialogComponent } from './pages/transfer/confirm-dialog/confirm-dialog.component';
import { TransferComponent } from './pages/transfer/transfer.component';
import { AuthInterceptor } from './shared/auth/auth.interceptor';

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
    MatSnackBarModule,
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
