import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartDetails:any={}
constructor(private _CartService:CartService){}

removeItem(id:string){
  this._CartService.removeItem(id).subscribe({
    next:(response)=>{
      console.log(response)
      this.cartDetails = response.data
      this._CartService.cartNumber.next(response.numOfCartItems)
      


    },
    error:(err)=>{
      console.log(err)
    }
  })
}
changeCart(id:string , count:number):void{
  if(count>0){
    this._CartService.updateCart(id, count).subscribe({
      next:(response)=>{
  // console.log(response)
  this.cartDetails = response.data
      },
      error:(err)=>{
        console.log(err)
      }
  
    })
  
  }
}

ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.cartDetails = response.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
}
}
