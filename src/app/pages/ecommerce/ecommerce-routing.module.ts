import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductCategoryComponent } from './product-category/product-category.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "product-detail/:id_product",
    component: ProductDetailComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "product-category",
    component: ProductCategoryComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path: "order-detail/:id_don",
    component: OrderDetailComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
