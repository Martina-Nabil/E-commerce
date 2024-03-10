import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryData:any=[]
constructor(private _EcomdataService:EcomdataService){}

ngOnInit(): void {
    this._EcomdataService.getCategories().subscribe({
      next:(response)=>{
        this.categoryData=response.data
      },

      error:(err)=>{
        console.log(err)
      }
    })
}
}
