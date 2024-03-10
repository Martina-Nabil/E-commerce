import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  products: Product[] = []
  wishlistData:string[]=[]
constructor(private _WishlistService:WishlistService , private _CartService:CartService , private _ToastrService:ToastrService){}

ngOnInit(): void {
    this._WishlistService.getUserWishlist().subscribe({
      next:(response)=>{
        console.log(response)
      this.products=response.data
      
      }
    })

    this._WishlistService.getUserWishlist().subscribe({
      next:(response)=>{
      //  console.log(response)
       const newData = response.data.map( (item:any)=> item._id)
       this.wishlistData = newData
    }})

}

addCart(id:string):void
{
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
console.log(response)
this._ToastrService.success(response.message,'Fresh Cart')
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

addFav(productId:string):void{
  this._WishlistService.addToWishlist(productId).subscribe({
    next:(response)=>{
      console.log(response.data)
      this.wishlistData = response.data
      this._ToastrService.success(response.message)
      
      
     
    
    }
  })
}

removeFav(productId:string):void{
  this._WishlistService.removeItemFromWishlist(productId).subscribe({
    next:(response)=>{
    // console.log('ay haga',response)
    this.wishlistData = response.data
    this._ToastrService.success(response.message)
    
//     this._WishlistService.getUserWishlist().subscribe({
//       next:(response)=>{
// this.products = response.data
//       }
//     })

this._WishlistService.numOfFavourites.next(response.data.length)
const newProductData= this.products.filter( (item:any)=>this.wishlistData.includes(item._id))
this.products = newProductData

    }
  
  })


}
}
