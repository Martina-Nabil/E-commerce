import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit{
  cartNum:number=0
  numFavorites :number =0

constructor(private _AuthService :AuthService, private _CartService:CartService , private _WishlistService:WishlistService){}
  logoutUser():void{
    this._AuthService.logout()
  }

ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next:(response)=>{
        // console.log(response)
        this.cartNum= response
      }
    })
    this._CartService.getCart().subscribe({
      next:(response)=>{
        this.cartNum = response.numOfCartItems
      }
    })

    this._WishlistService.numOfFavourites.subscribe({
      next:(response)=>{
          console.log(response)
          this.numFavorites = response
      }
    })
    this._WishlistService.getUserWishlist().subscribe({
      next:(response)=>{
this.numFavorites=response.count
      }
    })

}
}
