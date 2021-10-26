import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./layouts/layout-routing.module").then(
        (m) => m.LayoutRoutingModule
      ),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth-routing.module").then((m) => m.AuthRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
