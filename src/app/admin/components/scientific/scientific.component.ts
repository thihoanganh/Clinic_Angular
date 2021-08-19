
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BrandInfo } from 'src/app/models/BrandModelInfo';
import { MecineInfo } from 'src/app/models/MecineCategoryModelInfo';
import { OriginInfo } from 'src/app/models/OriginModelInfo';
import { PriceInfo } from 'src/app/models/PriceModelInfo';
import { ScientificInfo } from 'src/app/models/ScientificModelInfo';
import { LibraryServiceApi } from 'src/app/services/Librarysreviceapi';


@Component({
  selector: 'app-scientific',
  templateUrl: './scientific.component.html',
  styleUrls: ['./scientific.component.css']
})
export class ScientificComponent implements OnInit {
  formAddScientific!:FormGroup;

  imageUrl:string = "https://localhost:5001/Image/no-image.png";
  loading = false
  file: any;
  scientfic!:ScientificInfo[];
  brandlist!:BrandInfo[];
    originlist!:OriginInfo[];
    prices!:PriceInfo[];
    typelist!:MecineInfo[];
    stringObject:any;
    stringJson:any;
    keyword!:string;
    page=1;

  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
        private formBuilder:FormBuilder,
     
  ){}
  

  ngOnInit(): void {
    this.formAddScientific=this.formBuilder.group({ 
      name:'',
      inventedYear:'',
      description:'',
      illustration:'',
      quantity:0,
      brandId:1,
      originId:1,
      machineCategoryId:1,
      priceid:1,
      status:true
      
  });
 
    //show
    this.libraryseviceapi.Fidnall().then(
      res =>{
        this.scientfic=res;
       
      },
      err =>{
        console.log(err);
      }
    );
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
//
this.libraryseviceapi.MecineType().then(
  res=>{

      this.typelist=res;
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
 //
 selectFile(e: any) {
  this.file = e.target.files[0];
  var reader=new FileReader();
  reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
  }
  reader.readAsDataURL(this.file);
  console.log("filename:"+this.file);
}

    //
    saveScientific(){
      var scientific:ScientificInfo=this.formAddScientific.value;
      let formData = new FormData();
      formData.append('file', this.file);
      this.libraryseviceapi.UploadFile(formData).then(
        res =>{
          console.log(res);
        scientific.illustration=res;
        console.log(scientific.illustration);
          this.libraryseviceapi.AddScientific(scientific).then(
            re =>{
              alert("add thanh cong");
              window.location.reload();
             
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
  //search
  searchkey(){
    this.libraryseviceapi.searchKey(this.keyword).then(
      res => {
        this.scientfic = res;
        console.log(this.scientfic);
      },
      err => {
          console.log(err);
      }
    );
  }
  //
 
}

  

