import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Component pages
import { ProductsComponent } from "./ecommerce/products/products.component";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: "ecommerce",
    loadChildren: () =>
      import("./ecommerce/ecommerce.module").then((m) => m.EcommerceModule),
  },
  {
    path: "customer",
    loadChildren: () =>
      import("./customer/customer.module").then((m) => m.CustomerModule),
  },
  {
    path: "setting",
    loadChildren: () =>
      import("./setting/setting.module").then((m) => m.SettingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
