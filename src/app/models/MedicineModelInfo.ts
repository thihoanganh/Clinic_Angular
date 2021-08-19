export class MedicineInfo{
    id!: string|null;
    name!:string;
    illustration!:string;
    ingredient!:string;
    presentationFormat!:string;
    point!:string;
    using!:string;
    specialWarning!:string;
    quantity!:number;
    dateOfManufacture!:Date;
    expiry!:Date;
    status!:boolean;

    originId!:number;
    typeOfId!:number;
    brandId!:number;
    priceId!:number;

    brand1!:string;
    origin1!:string;
    category!:string;
    price1!:string;
   
}