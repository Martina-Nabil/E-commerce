import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categorydetails',
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {

  categoryId:any=''
  categoryDetails:any={}
  constructor(private _ActivatedRoute: ActivatedRoute , private _EcomdataService:EcomdataService){}
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
        this.categoryId = params.get('id')
    }
  })

  this._EcomdataService.getCategoryDetails(this.categoryId).subscribe({
    next:(response)=>{
      this.categoryDetails=response.data

    },
    error:(err)=>{
console.log(err)
    }
  })
    
}

}
