
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  selector: 'app-addmedicineapp',
  templateUrl: './addmedicineapp.component.html',
  styleUrls: ['./addmedicineapp.component.css']
})
export class AddMedicineAppComponent implements OnInit {
  formAddMedicine!:FormGroup;

  imageUrl:string = "https://localhost:5001/Image/no-image.png";
  loading = false
  file: any;
  
  brandlist!:BrandInfo[];
    originlist!:OriginInfo[];
    prices!:PriceInfo[];
  typemedicine!:MedicineTypeInfo[];

   medicine!:MedicineInfo[];
    

  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
    private librarysevicemedicineapi:LibraryServiceMedicineApi,
        private formBuilder:FormBuilder,
       
  ){}
  

  ngOnInit(): void {
    this.formAddMedicine=this.formBuilder.group({ 
      name:'',
      illustration:'',
      ingredient:'',
      presentationFormat:'',
      point:'',
      using:'',
      specialWarning:'',
      quantity:'',
      dateOfManufacture:'',
      expiry:'',
      status:true,
  
      originId:1,
      typeOfId:1,
      priceId:1,
      brandId:2,
  
  
      
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
 //
 this.libraryseviceapi.OriginList().then(
  res=>{

      this.originlist=res;
     console.log(res);
      },
      err=>{
          console.log(err);
      }
);
// type
this.librarysevicemedicineapi.MedicineType().then(
  res=>{

      this.typemedicine=res;
     console.log(res);
      },
      err=>{
          console.log(err);
      }
);
//
this.libraryseviceapi.PriceList().then(
  res=>{

     this.prices=res;
     console.log(res);
      },
      err=>{
          console.log(err);
      }
);

 
}
 //select file upload
 selectFile(e: any) {
  this.file = e.target.files[0];
  var reader=new FileReader();
  reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
  }
  reader.readAsDataURL(this.file);
  console.log("filename:"+this.file);
}

//add medicine
saveMedicine(){
  var medicine:MedicineInfo=this.formAddMedicine.value;
  let formData = new FormData();
  formData.append('file', this.file);
  this.librarysevicemedicineapi.UploadFile(formData).then(
    res =>{
      console.log(res);
    medicine.illustration=res;
    console.log(medicine.illustration);
      this.librarysevicemedicineapi.AddMedicine(medicine).then(
        re =>{
          alert("add thanh cong");
         
        console.log(re);
        },
        err =>{
          console.log(err);
        }
      )
    },
    err =>{
      console.log(err);
    }
  )
  
}
 
}

  

