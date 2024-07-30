import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbNavModule, NgbAccordionModule, NgbRatingModule, NgbTooltipModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

// Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask'

// Range Slider
import { NgxSliderModule } from 'ngx-slider-v2';
// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
// Count
import { CountUpModule } from 'ngx-countup';

// Load Icon
import { defineElement } from "@lordicon/element";
import lottie from 'lottie-web';

// Component Pages
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { OrdersComponent } from './orders/orders.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    AddProductComponent,
    ProductCategoryComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgxSliderModule,
    SimplebarAngularModule,
    SlickCarouselModule,
    CKEditorModule,
    DropzoneModule,
    FlatpickrModule.forRoot(),
    NgSelectModule,
    NgApexchartsModule,
    CountUpModule,
    EcommerceRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
    DatePipe,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcommerceModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
