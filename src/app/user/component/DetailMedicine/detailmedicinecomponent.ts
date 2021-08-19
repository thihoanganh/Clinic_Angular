import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MedicineInfo } from "src/app/models/MedicineModelInfo";
import { ScientificInfo } from "src/app/models/ScientificModelInfo";
import { LibraryServiceApi } from "src/app/services/Librarysreviceapi";
import { LibraryServiceMedicineApi } from "src/app/services/Librarysreviceapimedicine";




@Component({
    
    templateUrl: './detailmedicinecomponent.html'
})
export class DetailMedicineComponent implements OnInit{
  medicine!:MedicineInfo[];
    stringObject:any;
    stringJson:any;
    constructor(
      private librarysevicemedicineapi:LibraryServiceMedicineApi,
      private activatedroute:ActivatedRoute
    ){}
    ngOnInit(){
     
      this.activatedroute.paramMap.subscribe(params => {
        var id = params.get('id');
       
        console.log("id:"+id);
        this.librarysevicemedicineapi.MedicineDetail(id).then(
          res =>{
            this.stringJson = JSON.stringify(res);
                  this.stringObject = JSON.parse(this.stringJson);
                  console.log("JSON object -", this.stringObject);
          },
          err =>{
            console.log(err);
          }
        )
    });
    this.librarysevicemedicineapi.Findall().then(
      res=>{
      
      this.medicine=res;
     
      },
      err=>{
          console.log(err);
      }
      );
  }
 
   
}