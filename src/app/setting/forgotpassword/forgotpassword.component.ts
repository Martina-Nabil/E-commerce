import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpassService } from 'src/app/shared/services/forgotpass.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  constructor(private _ForgotpassService:ForgotpassService, private _Router:Router){}
step1:boolean= true
step2:boolean= false
step3:boolean= false
email:string=''
successMsg:string=''
errorMsg:string=''
forgotForm:FormGroup = new FormGroup({
  email: new FormControl('')
})

resetCodeForm:FormGroup = new FormGroup({
  resetCode: new FormControl('')
})
resetPasswordForm:FormGroup = new FormGroup({
  newPassword: new FormControl('')
})

forgotPassword():void{
  let userEmail = this.forgotForm.value
  this.email = userEmail.email
  this._ForgotpassService.forgotPassword(userEmail).subscribe({
    next:(response)=>{
      console.log(response)
      this.successMsg = response.message
      this.errorMsg = '';
      this.step1 = false
      this.step2 = true
    },
    error:(err)=>{
      console.log(err)
      this.errorMsg = err.error.message;
      this.successMsg = ''
      
    }
  })
}
resetCode():void{
  let resetCode = this.resetCodeForm.value
  this._ForgotpassService.resetCode(resetCode).subscribe({
    next:(response)=>{
      console.log(response)
      this.successMsg = response.message
      this.errorMsg = '';
      this.step2= false
      this.step3 = true

    },
    error:(err)=>{
console.log(err)
this.errorMsg = err.error.message;
this.successMsg = ''
    }
  })
}
newPassword():void{
  let resetForm = this.resetPasswordForm.value
resetForm.email = this.email

  this._ForgotpassService.resetPassword(resetForm).subscribe({
    next:(response)=>{
      if(response.token){
        localStorage.setItem('eToken',response.token)
        this._Router.navigate(['/home'])
      }
     
    },
    error:(err)=>{
      console.log(err)
      this.errorMsg = err.error.message
          }
  })
}
}
