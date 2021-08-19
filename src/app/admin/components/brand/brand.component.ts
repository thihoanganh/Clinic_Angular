
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
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  formAddBrand!:FormGroup;
  
  brandlist!:BrandInfo[];
  id!:number;

  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
  ){}
  

  ngOnInit(): void {
    this.formAddBrand=this.formBuilder.group({ 
     brand1:''
      
  }),
    
    //show combox

   this.libraryseviceapi.BrandList().then(
    res=>{

        this.brandlist=res;
       console.log(res);
        },
        err=>{
            console.log(err);
        }
);
      }
//add medicine
saveBrand(){
  var brand:BrandInfo=this.formAddBrand.value;
  
      this.libraryseviceapi.AddBrand(brand).then(
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
 deletebrand(){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.libraryseviceapi.DeleteBrand(id).toPromise().then(
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

  

