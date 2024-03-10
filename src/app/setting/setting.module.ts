import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import {  ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgotpasswordComponent,
    UpdatepasswordComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule,
  ]
})
export class SettingModule { }
