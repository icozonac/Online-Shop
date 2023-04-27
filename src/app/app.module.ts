import { CommonsModule } from './commons/commons/commons.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SuggestedProductsComponent } from './components/suggested-products/suggested-products.component';
import { AppProductComponent } from './components/product/product.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OpenProductsDirective } from './directives/open-products/open-products.directive';
import { OpenDproductsDetailsDirective } from './directives/open-products-details/open-products-details.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SuggestedProductsComponent,
    AppProductComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    OpenProductsDirective,
    OpenDproductsDetailsDirective,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonsModule,
    ReactiveFormsModule,
    RouterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('user');
        },
        allowedDomains: ['localhost:7206'],
      },
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
