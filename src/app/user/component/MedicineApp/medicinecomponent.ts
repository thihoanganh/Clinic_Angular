import { Component, OnInit } from "@angular/core";
import { BrandInfo } from "src/app/models/BrandModelInfo";
import { MecineInfo } from "src/app/models/MecineCategoryModelInfo";
import { MedicineInfo } from "src/app/models/MedicineModelInfo";
import { MedicineTypeInfo } from "src/app/models/MedicineTypeModelInfo";
import { ScientificInfo } from "src/app/models/ScientificModelInfo";
import { LibraryServiceApi } from "src/app/services/Librarysreviceapi";
import { LibraryServiceMedicineApi } from "src/app/services/Librarysreviceapimedicine";



@Component({
    
    templateUrl: './medicinecomponent.html'
})
export class MedicineAppUserComponent implements OnInit{
    

  medicine!:MedicineInfo[];
  medicinetype!:MedicineTypeInfo[];

  typeid!:number;
  keyword!:string;
  id!:number;
  p:number=1;
 
constructor(
    private libraryseviceapi:LibraryServiceMedicineApi
   
){}
    ngOnInit(){
        
    this.typeid=1
     
       //scientific list
        this.libraryseviceapi.Findall().then(
            res=>{
            
            this.medicine=res;
           
            },
            err=>{
                console.log(err);
            }
            );
            //show combox
            this.libraryseviceapi.MedicineType().then(
                res=>{
            
                    this.medicinetype=res;
                   
                    },
                    err=>{
                        console.log(err);
                    }
            );
       
    }
    selectsearch(e:any){
        this.libraryseviceapi.searchType(this.typeid).then(
            res => {
              this.medicine = res;
              console.log(this.medicine);
            },
            err => {
                console.log(err);
            }
          );
    }
    searchkey(){
        this.libraryseviceapi.searchKey(this.keyword).then(
            res => {
              this.medicine = res;
              console.log(this.medicine);
            },
            err => {
                console.log(err);
            }
          );
    }
  
}