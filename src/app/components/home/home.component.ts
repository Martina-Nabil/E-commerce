import { Component, OnInit, Renderer2 } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = []
  categories: any[] = []
  searchTerm:string = ''
  wishlistData:string[]=[]



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    navText: ['', ''],
   items:1,
    nav: true
  }

constructor(private _EcomdataService : EcomdataService , private _CartService :CartService ,private _ToastrService:ToastrService , private _WishlistService:WishlistService
  ,private _Renderer2:Renderer2){}

ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
        this.products = response.data
      }
    })
    this._EcomdataService.getCategories().subscribe({
      next:(response) =>{
      console.log(response)
      this.categories = response.data
      },
      error:(err) =>
      {console.log(err)}
    })
  
     this._WishlistService.getUserWishlist().subscribe({
      next:(response)=>{
       console.log(response)
       const newData = response.data.map( (item:any)=> item._id)
       this.wishlistData = newData
    }})
}

addCart(id:string,element:HTMLButtonElement):void
{
  this._Renderer2.setAttribute(element,'disabled','true')



  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
console.log(response)
this._ToastrService.success(response.message,'Fresh Cart')
this._Renderer2.removeAttribute(element,'disabled')

this._CartService.cartNumber.next(response.numOfCartItems)
    },
    error:(err)=>{
      console.log(err)
      this._Renderer2.removeAttribute(element,'disabled')
    }
  })
}

addFav(productId:string):void{
  this._WishlistService.addToWishlist(productId).subscribe({
    next:(response)=>{
      // console.log(response.data.length)
      this.wishlistData = response.data
      this._ToastrService.success(response.message)
      this._WishlistService.numOfFavourites.next(response.data.length)
    }
  })
}

removeFav(productId:string):void{
  this._WishlistService.removeItemFromWishlist(productId).subscribe({
    next:(response)=>{
    console.log(response)
    this.wishlistData = response.data
    this._ToastrService.success(response.message)
    this._WishlistService.numOfFavourites.next(response.data.length)
    }
  })
}
}
