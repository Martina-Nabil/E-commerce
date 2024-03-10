import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})


export class ProductsComponent implements OnInit {
  products: Product[] = []
  wishlistData:string[]=[]
  pageSize:number = 0;
  currentPage:number = 1;
  total:number = 1;
  constructor(private _EcomdataService:EcomdataService, private _CartService:CartService , private _ToastrService:ToastrService, private _WishlistService:WishlistService,private _Renderer2:Renderer2){}
  ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
        this.products = response.data
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.total= response.results
        // console.log(response)
      }
    })


    
    this._WishlistService.getUserWishlist().subscribe({
      next:(response)=>{
       console.log(response)
       const newData = response.data.map( (item:any)=> item._id)
       this.wishlistData = newData
    }})
  }
  addCart(id:string,elemnt:HTMLButtonElement):void
  {
    this._Renderer2.setAttribute(elemnt , 'disabled' ,'true')
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
  console.log(response)
  this._ToastrService.success(response.message,'Fresh Cart')
  this._Renderer2.removeAttribute(elemnt , 'disabled')
  this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
        this._Renderer2.removeAttribute(elemnt , 'disabled')
      }
    })
  }
  pageChanged(event:any):void{
    this._EcomdataService.getAllProducts(event).subscribe({
      next:(response)=>{
        this.products = response.data
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.total= response.results
        // console.log(response)
      }
    })
  }
  addFav(productId:string):void{
    this._WishlistService.addToWishlist(productId).subscribe({
      next:(response)=>{
        console.log(response)
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
