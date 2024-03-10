import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path:'', redirectTo:'update', pathMatch:'full'},
  {path:'update' , component:UpdatepasswordComponent},
  {path:'forgot' , component:ForgotpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
