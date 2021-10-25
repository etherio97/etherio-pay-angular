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
    ],
  },
];

@NgModule({
  declarations: [LayoutComponent, HomeComponent, BannerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    CarouselModule,
  ],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
