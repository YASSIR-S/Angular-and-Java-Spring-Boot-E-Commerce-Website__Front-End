import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes,RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment } from '../environments/environment';

import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { LoginComponent } from './components/login/login.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';




const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:"",redirectTo : "/login", pathMatch:"full"},

  {path:'admin',component:AdminTemplateComponent , children :[
    {path:'order-history',component:OrderHistoryComponent},
    {path:'checkout',component:CheckoutComponent},
    {path:'cart-details',component:CartDetailsComponent},
    {path:'products/:id',component:ProductDetailsComponent},
    {path:'search/:keyword',component:ProductListComponent}, 
    {path:'category/:id',component:ProductListComponent},
    {path:"category",component:ProductListComponent},
    {path:"products",component:ProductListComponent},
   // {path:"",redirectTo:'/products',pathMatch:'full'},
   // {path:"**",redirectTo:'/products',pathMatch:'full'}
  ]},

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    LoginComponent,
    AdminTemplateComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AppHttpInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
