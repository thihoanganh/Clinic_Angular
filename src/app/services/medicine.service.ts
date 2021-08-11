import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medicine } from "../models/medicine.model";

@Injectable()
export class MedicineService{

    baseUrl = 'http://localhost:5000/api/medicine/'
    constructor(private http:HttpClient){}
    getAll(){
        return this.http.get(this.baseUrl + "getall")
        .toPromise()
        .then(res => res as Medicine[]);
    }

    searchByName(name : string){
        return this.http.get(this.baseUrl + "searchbyname/" +name)
        .toPromise()
        .then(res => res as Medicine[]);
    }
}