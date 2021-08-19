import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Medicine } from "src/app/models/medicine.model";
import { PriceProduct } from "src/app/models/priceproduct.model";
import { Scientificequipment } from "src/app/models/scientificequipment.model";
import { PriceProductService } from "src/app/services/priceproduct.service";
import { ScientificEquipmentService } from "src/app/services/scientificequipment.service";


@Component({
    templateUrl: './scientificequipment.component.html'
  })

  
export class ScientificeqipmentComponent implements OnInit {


    scientificeqipments = new Array<Scientificequipment>();

    selectedScientificeqipment! : string;

    updatePriceForm! : FormGroup;

    ScientificeqipmentId! : number

    constructor(
        private scientificeqipmentService : ScientificEquipmentService,
        private formBuilder : FormBuilder,
        private priceMedicineService : PriceProductService
      ){}

    ngOnInit(): void {
        this.updatePriceForm = this.formBuilder.group({
            productId : Number,
            price : 0,
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

    select(scientificequipment : Scientificequipment){
        this.selectedScientificeqipment = scientificequipment.name;
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

    update(){
        var priceScientificeqipment : PriceProduct = this.updatePriceForm.value;
        console.log('idMedicine: ' + priceScientificeqipment.productId);
        console.log('Price: ' + priceScientificeqipment.price);
        console.log('Date: ' + priceScientificeqipment.date);

        var scientificeqipment : Medicine = this.searchScientificeqipmentByName(this.selectedScientificeqipment);
        if(scientificeqipment != null){
            priceScientificeqipment.productId = scientificeqipment.id;
            console.log('Medicine id: ' + priceScientificeqipment.productId);
            this.priceMedicineService.createScientificEquipment(priceScientificeqipment);
        }
        else
        {
            alert('Invalid Name');
        }
    }

    searchScientificeqipmentByName(name : string) : any{

        for(let scientificeqipment of this.scientificeqipments){
            if(scientificeqipment.name == name){
                return scientificeqipment;
            }
        }
        return null;

    }
}
