
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrandInfo } from 'src/app/models/BrandModelInfo';
import { OriginInfo } from 'src/app/models/OriginModelInfo';
import { LibraryServiceApi } from 'src/app/services/Librarysreviceapi';



@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {
  formAddOrigin!:FormGroup;
  
  originlist!:OriginInfo[];
  id!:number;
  p:number=1;
   
  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
       
  ){}
  

  ngOnInit(): void {
    this.formAddOrigin=this.formBuilder.group({ 
     origin1:''
      
  }),
    
    //show combox

   this.libraryseviceapi.OriginList().then(
    res=>{

        this.originlist=res;
       console.log(res);
        },
        err=>{
            console.log(err);
        }
);
      }
//add medicine
saveOrigin(){
  var origin:OriginInfo=this.formAddOrigin.value;
  
      this.libraryseviceapi.AddOrigin(origin).then(
        res =>{
          alert("add thanh cong");
        console.log(res);
        window.location.reload();
        },
        err =>{
          console.log(err);
        }
      )
  
}
 //
 deleteOrigin(){
  if(confirm(`Are you sure to delete ?`)){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.libraryseviceapi.DeleteOrigin(id).toPromise().then(
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

  

