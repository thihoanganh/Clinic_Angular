import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Medicine } from "src/app/models/medicine.model";
import { PriceProduct } from "src/app/models/priceproduct.model";
import { MedicineService } from "src/app/services/medicine.service";
import { PriceProductService } from "src/app/services/priceproduct.service";


@Component({
    templateUrl: './medicine.component.html'
  })

  
export class MedicineComponent implements OnInit {


    medicines = new Array<Medicine>();

    selectedMedicine! : string;

    updatePriceForm! : FormGroup;

    medicineId! : number

    constructor(
        private medicineService : MedicineService,
        private formBuilder : FormBuilder,
        private priceMedicineService : PriceProductService
      ){}

    ngOnInit(): void {
        this.updatePriceForm = this.formBuilder.group({
            productId : Number,
            price : 0,
            date : Date,
        });
        
        this.medicineService.getAll().then(
            res => {
                this.medicines = res;
            },
            err =>{
                console.log(err);
            }
        );
        this.selectedMedicine = '';
    }

    select(medicine : Medicine){
        this.selectedMedicine = medicine.name;
    }

    searchByName(){
        console.log(this.selectedMedicine);
        if(this.selectedMedicine != ""){
            this.medicineService.searchByName(this.selectedMedicine).then(
                res => {
                    this.medicines = res;
                },
                err =>{
                    console.log(err);
                }
            );
        }
        else {
            this.medicineService.getAll().then(
                res => {
                    this.medicines = res;
                },
                err =>{
                    console.log(err);
                }
            );
        }
    }

    update(){
        var priceMedicine : PriceProduct = this.updatePriceForm.value;
        console.log('idMedicine: ' + priceMedicine.productId);
        console.log('Price: ' + priceMedicine.price);
        console.log('Date: ' + priceMedicine.date);

        var medicine : Medicine = this.searchMedicineByName(this.selectedMedicine);
        if(medicine != null){
            priceMedicine.productId = medicine.id;
            console.log('Medicine id: ' + priceMedicine.productId);
            this.priceMedicineService.createPriceMedicine(priceMedicine);
        }
        else
        {
            alert('Invalid Name');
        }
    }

    searchMedicineByName(name : string) : any{

        for(let medicine of this.medicines){
            if(medicine.name == name){
                return medicine;
            }
        }
        return null;

    }
}
