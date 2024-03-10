import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotpasswordComponent } from './setting/forgotpassword/forgotpassword.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'', canActivate:[authGuard] ,component:BlankLayoutComponent ,children:[ 
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'cart',component:CartComponent},
  {path:'products',component:ProductsComponent},

  {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule)},

  {path:'checkout/:id',component:CheckoutComponent},
  {path:'allorders',component:AllordersComponent},
  {path:'details/:id',component:DetailsComponent},
  {path:'categories',component:CategoriesComponent},
  {path:'categorydetails/:id',component:CategorydetailsComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'brands',component:BrandsComponent},


  ]},
  {path:'', component:AuthLayoutComponent ,children:[
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgot' , component:ForgotpasswordComponent}
  ]},


  {path:'**',component:NotfoundComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
