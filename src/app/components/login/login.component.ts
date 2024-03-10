import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  msgError:string = ''
isLoading:boolean = false
constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder : FormBuilder){}
  // loginForm:FormGroup = new FormGroup({
  //   email: new FormControl(null , [Validators.required , Validators.email]),
  //   password : new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)])
  // }
  // );

  loginForm:FormGroup = this._FormBuilder.group({
  email:[null , [Validators.required , Validators.email] ],
  password: [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
      })

  handleForm():void{
    // console.log(this.registerForm)
    if(this.loginForm.valid){
      this.isLoading = true
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response) =>{
          console.log(response)
          if(response.message == 'success'){
            this.isLoading=false
            localStorage.setItem("eToken", response.token)
            this._AuthService.saveDataUser()
            this._Router.navigate(['/home'])
    
          }
        
        },
        error:(err:HttpErrorResponse) =>{
        // console.log(err);
        this.isLoading=false
      this.msgError = err.error.message;
      
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched()
    }
    }
}
