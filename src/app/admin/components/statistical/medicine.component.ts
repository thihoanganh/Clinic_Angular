import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ArgumentStatistical } from "src/app/models/argumentstatistical.model";
import { Medicine } from "src/app/models/medicine.model";
import { StatisticalMedicine } from "src/app/models/statisticalmedicine.model";
import { MedicineService } from "src/app/services/medicine.service";
import { StatisticalService } from "src/app/services/statistical.service";

@Component({
    templateUrl: './medicine.component.html'
  })
  
export class StatisticalMedicineComponent implements OnInit {

    medicines = new Array<Medicine>();

    selectedMedicine : any = '';
    
    argumentForm! : FormGroup;

    statisticalMedicines = new Array<StatisticalMedicine>();
    
    constructor(
        private medicineService : MedicineService,
        private formBuilder : FormBuilder,
        private statisticalService : StatisticalService
      ){}

    ngOnInit(): void {
        this.argumentForm = this.formBuilder.group({
            idProduct : Number,
            fromDate : Date,
            toDate : Date,
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
        console.log(medicine.name);
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

    search(){
        var argumentStatistical : ArgumentStatistical = this.argumentForm.value;
       

        var medicine : Medicine = this.searchMedicineByName(this.selectedMedicine);
        if(medicine != null){
            argumentStatistical.idProduct = medicine.id;
            console.log('Medicine id: ' + argumentStatistical.idProduct);
            this.statisticalService.orderProfitOfMedicine(argumentStatistical).then(
                res => {
                    this.statisticalMedicines = res;
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

        for(let medicine of this.medicines){
            if(medicine.name == name){
                return medicine;
            }
        }
        return null;

    }
}