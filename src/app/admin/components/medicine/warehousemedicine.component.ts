import { Component, OnInit } from "@angular/core";
import { Medicine } from "src/app/models/medicine.model";
import { MedicineService } from "src/app/services/medicine.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ReceiptMedicineService } from "src/app/services/receipmedicineservice.service";
import { ReceiptMedicine } from "src/app/models/receiptmedicine.model";

@Component({
    templateUrl: './warehousemedicine.component.html'
  })
  
export class WarehouseMedicineComponent implements OnInit {

    medicines = new Array<Medicine>();

    selectedMedicine! : string;

    receiptMedicineupdatePriceForm! : FormGroup;

    medicineId! : number

    constructor(
        private medicineService : MedicineService,
        private formBuilder : FormBuilder,
        private receiptMedicineService :ReceiptMedicineService
      ){}

    ngOnInit(): void {
        this.receiptMedicineupdatePriceForm = this.formBuilder.group({
            productId : Number,
            pricebuy : 0,
            amount : 0,
            date : Date,
            expirydate : Date,
            nameOfMedicine : ""
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

    create(){
      
        var receiptProduct : ReceiptMedicine = this.receiptMedicineupdatePriceForm.value;
        console.log('idMedicine: ' + receiptProduct.medicineId);
        console.log('Price: ' + receiptProduct.priceBuy);
        console.log('Date: ' + receiptProduct.date);

        var medicine : Medicine = this.searchMedicineByName(this.selectedMedicine);
        if(medicine != null){
            receiptProduct.medicineId = medicine.id;
            receiptProduct.nameOfMedicine = medicine.name;
            console.log('Medicine id: ' + receiptProduct.medicineId);
            this.receiptMedicineService.createReceiptMedicine(receiptProduct);
        }
        else
        {
            alert('Invalid Medicine Name');
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