import { Component, OnInit } from "@angular/core";
import { Medicine } from "src/app/models/medicine.model";
import { MedicineService } from "src/app/services/medicine.service";


@Component({
    templateUrl: './medicine.component.html'
  })

  
export class MedicineComponent implements OnInit {


    medicines = new Array<Medicine>();

    selectedMedicine! : string;


    constructor(
        private medicineService : MedicineService
      ){}

    ngOnInit(): void {
        this.medicineService.getAll().then(
            res => {
                this.medicines = res;
            },
            err =>{
                console.log(err);
            }
        );
        this.selectedMedicine = 'Insert Name Of Medicine';
    }

    select(medicine : Medicine){
        console.log(medicine.id);
        this.selectedMedicine = medicine.name;
        
    }

    searchByName(){
        console.log(this.selectedMedicine);
        if(this.selectedMedicine != null){
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
}
