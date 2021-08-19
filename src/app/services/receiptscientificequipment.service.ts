import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Medicine } from "../models/medicine.model";
import { PriceProduct } from "../models/priceproduct.model";
import { ReceiptMedicine } from "../models/receiptmedicine.model";
import { ReceiptScientificEquipment } from "../models/receiptScientificquipment.Model";

@Injectable()
export class ReceiptScientificEquipmentService{

    baseUrl = 'http://localhost:5000/api/receiptscuentificequipment/'
    constructor(private http:HttpClient){}
  

    createReceiptScientificEquipment(receiptScientificEquipment : ReceiptScientificEquipment){
        return this.http.post(this.baseUrl + "create",receiptScientificEquipment)
        .toPromise()
        .then(res => res as PriceProduct);
    }

}