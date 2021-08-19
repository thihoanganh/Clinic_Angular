import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BrandInfo } from "../models/BrandModelInfo";
import { MecineInfo } from "../models/MecineCategoryModelInfo";
import { OriginInfo } from "../models/OriginModelInfo";
import { PriceInfo } from "../models/PriceModelInfo";
import { ScientificInfo } from "../models/ScientificModelInfo";


const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class LibraryServiceApi{
    private Base_url: string = 'https://localhost:5001/api/scientific/';
 
  constructor(
    private httpCilent: HttpClient
  ){}
  Fidnall(){
    return this.httpCilent.get(this.Base_url + 'findall').toPromise().then(res => res as ScientificInfo[]);
  }
  ScientificList(){
    return this.httpCilent.get(this.Base_url + 'scientificlist');
  }
  DetailScientific(id: string){
    return this.httpCilent.get(this.Base_url + 'find/'+ id).toPromise().then(res => res as ScientificInfo);
  }
  MecineType(){
    return this.httpCilent.get(this.Base_url + 'machineCategory').toPromise().then(res => res as MecineInfo[]);
  }
  ScientificDetail(id: string|null){
    return this.httpCilent.get(this.Base_url + 'finddetail/'+ id).toPromise().then(res => res as ScientificInfo);
  }
  searchType(typeid: number){
    return this.httpCilent.get(this.Base_url + 'searchtype/'+ typeid).toPromise().then(res => res as ScientificInfo[]);
  }
  searchKey(keyword: string){
    return this.httpCilent.get(this.Base_url + 'searchkey/'+ keyword).toPromise().then(res => res as ScientificInfo[]);
  }
  deleteScientific(id:string|null){
    return this.httpCilent.delete(this.Base_url+'delete/'+id);
  }
 AddBrand(brand:BrandInfo){
  return this.httpCilent.post(this.Base_url+'addbrand',brand).toPromise().then(res=>res as BrandInfo);
 }
 AddOrigin(origin:OriginInfo){
  return this.httpCilent.post(this.Base_url+'addorigin',origin).toPromise().then(res=>res as OriginInfo);
 }
 AddTypeMecine(type:MecineInfo){
  return this.httpCilent.post(this.Base_url+'addmachinecategory',type).toPromise().then(res=>res as MecineInfo);
 }
 BrandList(){
  return this.httpCilent.get(this.Base_url + 'brand').toPromise().then(res => res as BrandInfo[]);
 }
 OriginList(){
  return this.httpCilent.get(this.Base_url + 'origin').toPromise().then(res => res as OriginInfo[]);
}
PriceList(){
  return this.httpCilent.get(this.Base_url + 'price').toPromise().then(res => res as PriceInfo[]);
}
addPrice(price:PriceInfo){
  return this.httpCilent.post(this.Base_url+'addprice',price).toPromise().then(res=>res as PriceInfo);
}
//
DeletePrice(id:string|null){
  return this.httpCilent.delete(this.Base_url+'deleteprice/'+id);
}
DeleteBrand(id:string|null){
  return this.httpCilent.delete(this.Base_url+'deletebrand/'+id);
}
DeleteOrigin(id:string|null){
  return this.httpCilent.delete(this.Base_url+'deleteorigin/'+id);
}
DeleteType(id:string|null){
  return this.httpCilent.delete(this.Base_url+'deletemachinecategory/'+id);
}
UploadFile(file:FormData){
  return this.httpCilent.post(this.Base_url + 'upload' , file ).toPromise().then(res => res as string);
 }
AddScientific(scientific:ScientificInfo)
{
 return this.httpCilent.post(this.Base_url+'addscientific',scientific).toPromise().then(res=>res as ScientificInfo);
}
UpdateScientific(scientific:ScientificInfo){
  return this.httpCilent.post(this.Base_url+'updatescientific',scientific).toPromise().then(res=>res as ScientificInfo);
}
}
