import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ArgumentStatistical } from "../models/argumentstatistical.model";
import { StatisticalMedicine } from "../models/statisticalmedicine.model";
import { StatisticalScientificEquipment } from "../models/statisticalscientificequipment.model";

@Injectable()
export class StatisticalService{
   

    baseUrl = 'http://localhost:5000/api/detailorder/'
    constructor(private http:HttpClient){}
  

    orderProfitOfMedicine(argumentStatistical : ArgumentStatistical){
        return this.http.post(this.baseUrl + "orderprofitofmedicine",argumentStatistical)
        .toPromise()
        .then(res => res as StatisticalMedicine[]);
    }

    orderProfitOfScientificEquipment(argumentStatistical: ArgumentStatistical) {
        return this.http.post(this.baseUrl + "orderprofitofscientificequipment",argumentStatistical)
        .toPromise()
        .then(res => res as StatisticalScientificEquipment[]);
    }
}