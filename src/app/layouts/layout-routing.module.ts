import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { LayoutComponent } from "./layout.component";
import { AuthGuard } from "../guards/auth.guard";
import { HomeComponent } from "../home/home.component";
import { MatIconModule } from "@angular/material/icon";
import { CarouselModule } from "ngx-owl-carousel-o";
import { BannerComponent } from "../home/banner/banner.component";
import { HeaderComponent } from "../home/header/header.component";
import { FeatureButtonComponent } from "../home/feature-button/feature-button.component";
import { FeatureButtonsComponent } from "../home/feature-buttons/feature-buttons.component";
import { TransferComponent } from "../transfer/transfer.component";
import { BackButtonComponent } from "../components/back-button/back-button.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogComponent } from "../transfer/confirm-dialog/confirm-dialog.component";
import { RecievedComponent } from "../history/recieved/recieved.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SentComponent } from "../history/sent/sent.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { AccountService } from "../shared/account.service";
import { ScanComponent } from "../scan/scan.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "transfer",
        component: TransferComponent,
      },
      {
        path: "recieved",
        component: RecievedComponent,
      },
      {
        path: "sent",
        component: SentComponent,
      },
      {
        path: "scan",
        component: ScanComponent,
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
  providers: [AccountService],
})
export class LayoutRoutingModule {}
