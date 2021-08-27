
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrandInfo } from 'src/app/models/BrandModelInfo';
import { MedicineInfo } from 'src/app/models/MedicineModelInfo';
import { MedicineTypeInfo } from 'src/app/models/MedicineTypeModelInfo';
import { OriginInfo } from 'src/app/models/OriginModelInfo';
import { PriceInfo } from 'src/app/models/PriceModelInfo';
import { LibraryServiceApi } from 'src/app/services/Librarysreviceapi';
import { LibraryServiceMedicineApi } from 'src/app/services/Librarysreviceapimedicine';


@Component({
  selector: 'app-updatemedicineapp',
  templateUrl: './updatemedicineapp.component.html',
  styleUrls: ['./updatemedicineapp.component.css']
})
export class UpdateMedicineAppComponent implements OnInit {
  formUpdateMedicine!:FormGroup;

  imageUrl:string = "https://localhost:5001/Image/no-image.png";
  loading = false
  file: any;
  
  brandlist!:BrandInfo[];
    originlist!:OriginInfo[];
    prices!:PriceInfo[];
  typemedicine!:MedicineTypeInfo[];

   medicine!:MedicineInfo[];
   stringObject:any;
   stringJson:any;

   name!:string;


  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
    private librarysevicemedicineapi:LibraryServiceMedicineApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
  ){}
  

  ngOnInit(): void {
  
//

  this.activatedroute.paramMap.subscribe(params => {
    var id = params.get('id');
   
    console.log("id:"+id);
    this.librarysevicemedicineapi.MedicineDetail(id).then(
      res =>{
        this.stringJson = JSON.stringify(res);
              this.stringObject = JSON.parse(this.stringJson);
              console.log("JSON object -", this.stringObject);
              this.formUpdateMedicine=this.formBuilder.group({ 
                name:this.stringObject.name,
                illustration:'',
                ingredient:this.stringObject.ingredient,
                presentationFormat:this.stringObject.presentationFormat,
                point:this.stringObject.point,
                using:this.stringObject.using,
                specialWarning:this.stringObject.specialWarning,
                quantity:this.stringObject.quantity,
                dateOfManufacture:this.stringObject.dateOfManufacture,
                expiry:this.stringObject.expiry,
                status:this.stringObject.status,
            
                originId:this.stringObject.originId,
                typeOfId:this.stringObject.typeOfId,
                brandId:this.stringObject.brandId,
                priceId:this.stringObject.priceId,    

              });
           
      },
      err =>{
        console.log(err);
      }
    )
});  

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
  
  var medicine:MedicineInfo=this.formUpdateMedicine.value;
  this.activatedroute.paramMap.subscribe(params => {
   var id =params.get('id');
  medicine.id=id;
});

  let formData = new FormData();
  formData.append('file', this.file);
  this.librarysevicemedicineapi.UploadFile(formData).then(
    res =>{
      console.log(res);
    medicine.illustration=res;
    console.log(medicine.illustration);
      this.librarysevicemedicineapi.UpdateMedicine(medicine).then(
        re =>{
          alert("Update successful");
         
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
updateclick(){
  window.location.reload();
}
}

  

