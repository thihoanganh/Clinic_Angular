
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrandInfo } from 'src/app/models/BrandModelInfo';
import { MecineInfo } from 'src/app/models/MecineCategoryModelInfo';
import { MedicineInfo } from 'src/app/models/MedicineModelInfo';
import { MedicineTypeInfo } from 'src/app/models/MedicineTypeModelInfo';
import { OriginInfo } from 'src/app/models/OriginModelInfo';
import { PriceInfo } from 'src/app/models/PriceModelInfo';
import { ScientificInfo } from 'src/app/models/ScientificModelInfo';
import { LibraryServiceApi } from 'src/app/services/Librarysreviceapi';
import { LibraryServiceMedicineApi } from 'src/app/services/Librarysreviceapimedicine';


@Component({
  selector: 'app-mecinetype',
  templateUrl: './mecinetype.component.html',
  styleUrls: ['./mecinetype.component.css']
})
export class MecineTypeComponent implements OnInit {
  formAddMecineType!:FormGroup;
  
  mecinetype!:MecineInfo[];
  id!:number;

  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
  ){}
  

  ngOnInit(): void {
    this.formAddMecineType=this.formBuilder.group({ 
     name:''
      
  }),
    
    //show combox

   this.libraryseviceapi.MecineType().then(
    res=>{

        this.mecinetype=res;
       console.log(res);
        },
        err=>{
            console.log(err);
        }
);
      }
//add medicine
saveMecineType(){
  var mecine:MecineInfo=this.formAddMecineType.value;
  
      this.libraryseviceapi.AddTypeMecine(mecine).then(
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
 //delete
 deleteMecine(){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.libraryseviceapi.DeleteType(id).toPromise().then(
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

  

