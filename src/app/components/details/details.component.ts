import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  productDetails:Product = {} as Product

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



  constructor(private _ActivatedRoute:ActivatedRoute , private _EcomdataService:EcomdataService, private _CartService :CartService , private _ToastrService:ToastrService){}
  
ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any = params.get('id')
        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next:(response)=>{
            console.log(response)
           this.productDetails = response.data
          }
        })
      }
    })
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
}
