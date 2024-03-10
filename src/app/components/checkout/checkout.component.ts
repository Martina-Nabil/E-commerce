import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
constructor(private _FormBuilder:FormBuilder , private _ActivatedRoute:ActivatedRoute , private _CartService :CartService){}

cartId:any = ''
checkout:FormGroup = this._FormBuilder.group({
  details:[''],
  phone:[''],
  city:[''],
  

})
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
this.cartId= params.get('id')
      }
    })
}

handleForm():void{
  this._CartService.checkout(this.cartId , this.checkout.value).subscribe({
    next:(response)=>{
if(response.status == 'success'){
  window.open(response.session.url ,'_Self')
}
    }
  })
}
}
