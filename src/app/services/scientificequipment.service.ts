import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medicine } from "../models/medicine.model";
import { Scientificequipment } from "../models/scientificequipment.model";

@Injectable()
export class ScientificEquipmentService{

    baseUrl = 'http://localhost:5000/api/scientificequipment/'
    constructor(private http:HttpClient){}
    getAll(){
        return this.http.get(this.baseUrl + "getall")
        .toPromise()
        .then(res => res as Scientificequipment[]);
    }

    searchByName(name : string){
        return this.http.get(this.baseUrl + "searchbyname/" +name)
        .toPromise()
        .then(res => res as Scientificequipment[]);
    }
}