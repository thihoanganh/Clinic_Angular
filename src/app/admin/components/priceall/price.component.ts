
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
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceAllComponent implements OnInit {
  formAddPrice!:FormGroup;
  
  price!:PriceInfo[];
  id!:number;
  p:number=1;

  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
  ){}
  

  ngOnInit(): void {
    this.formAddPrice=this.formBuilder.group({ 
     price1:1,
     date:''
      
  }),
    
    //show combox

   this.libraryseviceapi.PriceList().then(
    res=>{

        this.price=res;
       console.log(res);
        },
        err=>{
            console.log(err);
        }
);
      }
//add medicine
savePrice(){
  var prices:PriceInfo=this.formAddPrice.value;
  
      this.libraryseviceapi.addPrice(prices).then(
        res =>{
          alert("add successful");
        console.log(res);
        window.location.reload();
        },
        err =>{
          console.log(err);
        }
      )
  
}
 //delete
 deleteprice(){
  if(confirm(`Are you sure to delete ?`)){
  this.activatedroute.paramMap.subscribe(params =>{
    var id=params.get('id');
    this.libraryseviceapi.DeletePrice(id).toPromise().then(
      res =>{
        console.log(id);
        console.log('done');
        alert('successful delete');
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

  

