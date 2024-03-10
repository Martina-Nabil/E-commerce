import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any
  constructor(private _HttpClient:HttpClient , private _Router :Router) { }

logout(){
  localStorage.removeItem("eToken")
  this._Router.navigate(['/login'])
}


  saveDataUser(){
    if(localStorage.getItem("eToken")){
      let encodeToken:any = localStorage.getItem("eToken")
      let decodeToken =jwtDecode(encodeToken)
      this.userData = decodeToken
      console.log(decodeToken)
    }
  }

  setRegister(userData:object):Observable<any>{
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` ,userData)
  }

  setLogin(userData:object):Observable<any>{
   return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` ,userData)

  }
}
