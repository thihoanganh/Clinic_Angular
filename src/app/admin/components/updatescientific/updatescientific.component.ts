
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BrandInfo } from 'src/app/models/BrandModelInfo';
import { MecineInfo } from 'src/app/models/MecineCategoryModelInfo';
import { OriginInfo } from 'src/app/models/OriginModelInfo';
import { PriceInfo } from 'src/app/models/PriceModelInfo';
import { ScientificInfo } from 'src/app/models/ScientificModelInfo';
import { LibraryServiceApi } from 'src/app/services/Librarysreviceapi';
import { __values } from 'tslib';


@Component({
  selector: 'app-updatescientific',
  templateUrl: './updatescientific.component.html',
  styleUrls: ['./updatescientific.component.css']
})
export class UpdateScientificComponent implements OnInit {
  formUpdateScientific!:FormGroup;

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
    


  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private libraryseviceapi:LibraryServiceApi,
        private formBuilder:FormBuilder,
        private activatedroute:ActivatedRoute
  ){}
  

  ngOnInit(): void {
   
    
 
//show value in update

  this.activatedroute.paramMap.subscribe(params => {
    var id = params.get('id');
   
    console.log("id:"+id);
    this.libraryseviceapi.ScientificDetail(id).then(
      res =>{
        this.stringJson = JSON.stringify(res);
              this.stringObject = JSON.parse(this.stringJson);
              console.log("JSON object -", this.stringObject);
              this.formUpdateScientific=this.formBuilder.group({ 
                id:this.stringObject.id,
                name:this.stringObject.name,
                inventedYear:this.stringObject.inventedYear,
                description:this.stringObject.description,
                illustration:'',
                quantity:this.stringObject.quantity,
                brandId:this.stringObject.brandId,
                originId:this.stringObject.originId,
                machineCategoryId:this.stringObject.machineCategoryId,
                priceid:this.stringObject.priceid,
                status:this.stringObject.status
               
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
     
      var scientific:ScientificInfo=this.formUpdateScientific.value;
      this.activatedroute.paramMap.subscribe(params => {
       var id =params.get('id');
      scientific.id=id;
    });
      console.log("result:"+scientific);
      let formData = new FormData();
      formData.append('file', this.file);
      this.libraryseviceapi.UploadFile(formData).then(
        res =>{
         
        scientific.illustration=res;
        console.log("file:"+scientific.illustration);
       
          this.libraryseviceapi.UpdateScientific(scientific).then(
            re =>{
              alert("update thanh cong");
              console.log(re);
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

