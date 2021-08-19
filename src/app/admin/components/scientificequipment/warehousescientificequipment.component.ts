
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Medicine } from "src/app/models/medicine.model";
import { ReceiptMedicine } from "src/app/models/receiptmedicine.model";
import { ReceiptScientificEquipment } from "src/app/models/receiptScientificquipment.Model";
import { Scientificequipment } from "src/app/models/scientificequipment.model";
import { MedicineService } from "src/app/services/medicine.service";
import { ReceiptScientificEquipmentService } from "src/app/services/receiptscientificequipment.service";
import { ScientificEquipmentService } from "src/app/services/scientificequipment.service";

@Component({
    templateUrl: './warehousescientificequipment.component.html'
  })
  
export class WarehouseScientificEquipmentComponent implements OnInit {
    scientificeqipments = new Array<Scientificequipment>();

    selectedScientificeqipment! : string;

    receiptScientificEquipmentupdatePriceForm! : FormGroup;

    ScientificeqipmentId! : number

    constructor(
        private scientificeqipmentService : ScientificEquipmentService,
        private formBuilder : FormBuilder,
        private receiptScientificEquipmentService :ReceiptScientificEquipmentService
      ){}

    ngOnInit(): void {
        this.receiptScientificEquipmentupdatePriceForm = this.formBuilder.group({
            scientificEquipmentId : Number,
            priceBuy : 0,
            amount : 0,
            date : Date,
        });
        
        this.scientificeqipmentService.getAll().then(
            res => {
                this.scientificeqipments = res;
            },
            err =>{
                console.log(err);
            }
        );
        this.selectedScientificeqipment = '';
    }

    select(medicine : Scientificequipment){
        this.selectedScientificeqipment = medicine.name;
    }

    searchByName(){
        console.log(this.selectedScientificeqipment);
        if(this.selectedScientificeqipment != ""){
            this.scientificeqipmentService.searchByName(this.selectedScientificeqipment).then(
                res => {
                    this.scientificeqipments = res;
                },
                err =>{
                    console.log(err);
                }
            );
        }
        else {
            this.scientificeqipmentService.getAll().then(
                res => {
                    this.scientificeqipments = res;
                },
                err =>{
                    console.log(err);
                }
            );
        }
    }

    create(){
      
        var receiptProduct : ReceiptScientificEquipment = this.receiptScientificEquipmentupdatePriceForm.value;
        console.log('idMedicine: ' + receiptProduct.scientificEquipmentId);
        console.log('Price: ' + receiptProduct.priceBuy);
        console.log('Date: ' + receiptProduct.date);

        var medicine : Medicine = this.searchMedicineByName(this.selectedScientificeqipment);
        if(medicine != null){
            receiptProduct.scientificEquipmentId = medicine.id;
            console.log('Medicine id: ' + receiptProduct.scientificEquipmentId);
            this.receiptScientificEquipmentService.createReceiptScientificEquipment(receiptProduct);
        }
        else
        {
            alert('Invalid Medicine Name');
        }
    }

    searchMedicineByName(name : string) : any{

        for(let medicine of this.scientificeqipments){
            if(medicine.name == name){
                return medicine;
            }
        }
        return null;

    }

}