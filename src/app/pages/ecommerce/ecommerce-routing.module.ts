import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductCategoryComponent } from './product-category/product-category.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "product-detail",
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
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
