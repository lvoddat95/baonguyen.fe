import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { JsonpModule } from '@angular/http';
// search module
import { NgPipesModule } from "ngx-pipes";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { environment } from "../environments/environment";
import { initFirebaseBackend } from "./authUtils";
import { ErrorInterceptor } from "./core/helpers/error.interceptor";
import { JwtInterceptor } from "./core/helpers/jwt.interceptor";

// Language
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

// Store
import { rootReducer } from "./store";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { EcommerceEffects } from "./store/Ecommerce/ecommerce_effect";
import { AuthenticationEffects } from "./store/Authentication/authentication.effects";
import { CategoryEffects } from "./store/Ecommerce/product-category/product-category.effect";

export function createTranslateLoader(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

if (environment.defaultauth === "firebase") {
  initFirebaseBackend(environment.firebaseConfig);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({   // Cấu hình Toastr tại đây
      timeOut: 3000, // Thời gian tồn tại của toast
      positionClass: 'toast-top-right', // Vị trí của toast trên màn hình
      preventDuplicates: true, // Ngăn chặn trùng lặp các toast
      progressBar: true,
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([
      AuthenticationEffects,
      EcommerceEffects,
      CategoryEffects,
    ]),
    PagesModule,
    NgPipesModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
