
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ScientificInfo } from "src/app/models/ScientificModelInfo";
import { LibraryServiceApi } from "src/app/services/Librarysreviceapi";




@Component({
  selector: 'app-scientificdetail',
  templateUrl: './scientificdetail.component.html',
  styleUrls: ['./scientificdetail.component.css']
})
export class ScientificDetailComponent implements OnInit {

  stringObject:any;
  stringJson:any;
  
  constructor(
    private libraryseviceapi:LibraryServiceApi,
    private activatedroute:ActivatedRoute
  ){}
  
  
  ngOnInit() {
   
    this.activatedroute.paramMap.subscribe(params => {
      var id = params.get('id');
     
      console.log("id:"+id);
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
  });
  
}
 //delete
 deletescientific(){
  if(confirm(`Are you sure to delete ?`)){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.libraryseviceapi.deleteScientific(id).toPromise().then(
      res =>{
        console.log(id);
        console.log('done');
        alert('xoa thanh cong');
        window.location.reload();
      },
      err =>{
        console.log(err);
      }
    );
});
 }
 }
}

  

