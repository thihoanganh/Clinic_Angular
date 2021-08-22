
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MedicineTypeInfo } from 'src/app/models/MedicineTypeModelInfo';
import { LibraryServiceMedicineApi } from 'src/app/services/Librarysreviceapimedicine';


@Component({
  selector: 'app-medicinetype',
  templateUrl: './medicinetype.component.html',
  styleUrls: ['./medicinetype.component.css']
})
export class MedicineTypeComponent implements OnInit {
  formAddMedicineType!:FormGroup;
  
  medicinetype!:MedicineTypeInfo[];
  id!:number;
  p:number=1;

  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private librarysevicemedicineapi:LibraryServiceMedicineApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
  ){}
  

  ngOnInit(): void {
    this.formAddMedicineType=this.formBuilder.group({ 
     category:''
      
  }),
    
    //show combox

   this.librarysevicemedicineapi.MedicineType().then(
    res=>{

        this.medicinetype=res;
       console.log(res);
        },
        err=>{
            console.log(err);
        }
);
      }
//add medicine
saveMedicineType(){
  var typemedicine:MedicineTypeInfo=this.formAddMedicineType.value;
  
      this.librarysevicemedicineapi.AddTypeMedicine(typemedicine).then(
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
 
 deletemedicinetype(){
  if(confirm(`Are you sure to delete ?`)){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.librarysevicemedicineapi.DeleteType(id).toPromise().then(
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

  

