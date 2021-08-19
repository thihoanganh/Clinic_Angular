import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ScientificInfo } from "src/app/models/ScientificModelInfo";
import { LibraryServiceApi } from "src/app/services/Librarysreviceapi";




@Component({
    
    templateUrl: './detailscientificcomponent.html'
})
export class DetailScientificComponent implements OnInit{
  scientfic!:ScientificInfo[];
    stringObject:any;
    stringJson:any;
    constructor(
        private libraryseviceapi:LibraryServiceApi,
        private activatedroute:ActivatedRoute
    ){}
    ngOnInit(){
     
        this.activatedroute.paramMap.subscribe(params =>{
            var id=params.get('id');
            this.libraryseviceapi.ScientificDetail(id).then(
              res =>{
                this.stringJson = JSON.stringify(res);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
              },
              err =>{
                console.log(err);
              }
            )
            console.log(this.libraryseviceapi.ScientificDetail(id));
        });
        //
        this.libraryseviceapi.Fidnall().then(
          res=>{
          
          this.scientfic=res;
         
          },
          err=>{
              console.log(err);
          }
          );
    }
   
}