import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  brands:any=[]
constructor(private _EcomdataService:EcomdataService){}
ngOnInit(): void {
    this._EcomdataService.getAllBrands().subscribe({
      next:(response)=>{
      this.brands=response.data
      }
    })
}
}
