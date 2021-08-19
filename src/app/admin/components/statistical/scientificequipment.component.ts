import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ArgumentStatistical } from "src/app/models/argumentstatistical.model";
import { Medicine } from "src/app/models/medicine.model";
import { Scientificequipment } from "src/app/models/scientificequipment.model";
import { StatisticalMedicine } from "src/app/models/statisticalmedicine.model";
import { StatisticalScientificEquipment } from "src/app/models/statisticalscientificequipment.model";
import { MedicineService } from "src/app/services/medicine.service";
import { ScientificEquipmentService } from "src/app/services/scientificequipment.service";
import { StatisticalService } from "src/app/services/statistical.service";

@Component({
    templateUrl: './scientificequipment.component.html'
  })
  
export class StatisticalScientificEquipmentComponent implements OnInit {

    scientificEquipments = new Array<Scientificequipment>();

    selectedScientificEquipment : any = '';
    
    argumentForm! : FormGroup;

    statisticalScientificEquipments = new Array<StatisticalScientificEquipment>();
    
    constructor(
        private scientificEquipmentService : ScientificEquipmentService,
        private formBuilder : FormBuilder,
        private statisticalService : StatisticalService
      ){}

    ngOnInit(): void {
        this.argumentForm = this.formBuilder.group({
            idProduct : Number,
            fromDate : Date,
            toDate : Date,
        });

        this.scientificEquipmentService.getAll().then(
            res => {
                this.scientificEquipments = res;
            },
            err =>{
                console.log(err);
            }
        );
        this.selectedScientificEquipment = '';
    }

    select(scientificequipment : Scientificequipment){
        console.log(scientificequipment.name);
        this.selectedScientificEquipment = scientificequipment.name;
    }

    searchByName(){
        console.log(this.selectedScientificEquipment);
        if(this.selectedScientificEquipment != ""){
            this.scientificEquipmentService.searchByName(this.selectedScientificEquipment).then(
                res => {
                    this.scientificEquipments = res;
                },
                err =>{
                    console.log(err);
                }
            );
        }
        else {
            this.scientificEquipmentService.getAll().then(
                res => {
                    this.scientificEquipments = res;
                },
                err =>{
                    console.log(err);
                }
            );
        }
    }

    search(){
        var argumentStatistical : ArgumentStatistical = this.argumentForm.value;
       

        var scientificequipment : Scientificequipment = this.searchMedicineByName(this.selectedScientificEquipment);
        if(scientificequipment != null){
            argumentStatistical.idProduct = scientificequipment.id;
            console.log('Medicine id: ' + argumentStatistical.idProduct);
            this.statisticalService.orderProfitOfScientificEquipment(argumentStatistical).then(
                res => {
                    this.statisticalScientificEquipments = res;
                },
                err =>{
                    console.log(err);
                }
            );;
        }
        else
        {
            alert('Invalid Name');
        }
    }

    searchMedicineByName(name : string) : any{

        for(let scientificequipment of this.scientificEquipments){
            if(scientificequipment.name == name){
                return scientificequipment;
            }
        }
        return null;

    }
}