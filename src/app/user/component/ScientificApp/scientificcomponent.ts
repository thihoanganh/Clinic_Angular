import { Component, OnInit } from "@angular/core";
import { NEVER } from "rxjs";
import { BrandInfo } from "src/app/models/BrandModelInfo";
import { MecineInfo } from "src/app/models/MecineCategoryModelInfo";
import { Scientificequipment } from "src/app/models/scientificequipment.model";
import { ScientificInfo } from "src/app/models/ScientificModelInfo";
import { LibraryServiceApi } from "src/app/services/Librarysreviceapi";



@Component({
    
    templateUrl: './scientificcomponent.html'
})
export class ScientificAppComponent implements OnInit{
    

  scientfic!:ScientificInfo[];
  mecinetype!:MecineInfo[];
  typeid!:number;
  keyword!:string;
  id!:number;
  brandlist!:BrandInfo[];
  p:number=1;
  
 
constructor(
    private libraryseviceapi:LibraryServiceApi,
   
){}
    ngOnInit(){
     
    this.typeid=1
     
    //
    
       //scientific list
        this.libraryseviceapi.Fidnall().then(
            res=>{
            
            this.scientfic=res;
           
            },
            err=>{
                console.log(err);
            }
            );
            //show combox
            this.libraryseviceapi.MecineType().then(
                res=>{
            
                    this.mecinetype=res;
                   
                    },
                    err=>{
                        console.log(err);
                    }
            );
       
    }
    selectsearch(e:any){
        this.libraryseviceapi.searchType(this.typeid).then(
            res => {
              this.scientfic = res;
              console.log(this.scientfic);
            },
            err => {
                console.log(err);
            }
          );
    }
    searchkey(){
        this.libraryseviceapi.searchKey(this.keyword).then(
            res => {
              this.scientfic = res;
              console.log(this.scientfic);
            },
            err => {
                console.log(err);
            }
          );
    }
  //----------------------------------------------------
  
}