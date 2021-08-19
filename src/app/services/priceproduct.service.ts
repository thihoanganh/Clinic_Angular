import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Medicine } from "../models/medicine.model";
import { PriceProduct } from "../models/priceproduct.model";

@Injectable()
export class PriceProductService{

    baseUrl = 'http://localhost:5000/api/price/'
    constructor(private http:HttpClient){}
  

    createPriceMedicine(priceproduct : PriceProduct){
        return this.http.post(this.baseUrl + "createpricemedicine",priceproduct)
        .toPromise()
        .then(res => res as PriceProduct);
    }

    createScientificEquipment(priceproduct: PriceProduct) {
        return this.http.post(this.baseUrl + "createpricescientificEquipment",priceproduct)
        .toPromise()
        .then(res => res as PriceProduct);
    }
}
