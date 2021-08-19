import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Medicine } from "../models/medicine.model";
import { PriceProduct } from "../models/priceproduct.model";
import { ReceiptMedicine } from "../models/receiptmedicine.model";

@Injectable()
export class ReceiptMedicineService{

    baseUrl = 'http://localhost:5000/api/receipmedicine/'
    constructor(private http:HttpClient){}
  

    createReceiptMedicine(receiptProduct : ReceiptMedicine){
        return this.http.post(this.baseUrl + "createreceiptmedicine",receiptProduct)
        .toPromise()
        .then(res => res as PriceProduct);
    }

}