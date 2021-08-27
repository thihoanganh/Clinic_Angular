
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ScientificInfo } from "src/app/models/ScientificModelInfo";
import { LibraryServiceApi } from "src/app/services/Librarysreviceapi";
import { LibraryServiceMedicineApi } from "src/app/services/Librarysreviceapimedicine";




@Component({
  selector: 'app-medicinedetail',
  templateUrl: './medicinedetail.component.html',
  styleUrls: ['./medicinedetail.component.css']
})
export class MedicineDetailComponent implements OnInit {

  stringObject:any;
  stringJson:any;
  
  constructor(
    private librarysevicemedicineapi:LibraryServiceMedicineApi,
    private activatedroute:ActivatedRoute
  ){}
  
  
  ngOnInit() {
   
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
  
}
 //delete
 deletescientific(){
  if(confirm(`Are you sure to delete ?`)){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.librarysevicemedicineapi.deleteMedicine(id).toPromise().then(
      res =>{
        console.log(id);
        console.log('done');
        alert('successful delete');
        window.location.reload()
      },
      err =>{
        console.log(err);
      }
    );
});
 }
 }
}

  

