import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbAccordionModule, NgbDropdownModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Counter
import { CountUpModule } from 'ngx-countup';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ScrollspyDirective } from './scrollspy.directive';
import { LandingScrollspyDirective } from './landingscrollspy.directive';
import { ToastComponent } from './toast/toast.component';
import { CurrencyInputDirective } from './currencyMask.directive';
import { CurrencyMaskDirective } from './currency-mask.directive';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ScrollspyDirective,
    LandingScrollspyDirective,
    ToastComponent,
    CurrencyInputDirective,
    CurrencyMaskDirective,
  ],
  imports: [
    CommonModule,
    NgbToastModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    SlickCarouselModule,
    CountUpModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    BreadcrumbsComponent, 
    ScrollspyDirective, 
    LandingScrollspyDirective, 
    ToastComponent, 
    CurrencyInputDirective, 
    CurrencyMaskDirective,
  ]
})
export class SharedModule { }
