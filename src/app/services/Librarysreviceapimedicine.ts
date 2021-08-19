import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MecineInfo } from "../models/MecineCategoryModelInfo";
import { MedicineInfo } from "../models/MedicineModelInfo";
import { MedicineTypeInfo } from "../models/MedicineTypeModelInfo";



const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class LibraryServiceMedicineApi{
    private Base_url: string = 'https://localhost:5001/api/medicine/';
 
  constructor(
    private httpCilent: HttpClient
  ){}
  Findall(){
    return this.httpCilent.get(this.Base_url + 'findall').toPromise().then(res => res as MedicineInfo[]);
  }
  MedicineList(){
    return this.httpCilent.get(this.Base_url + 'medicinelist');
  }

  DetailMedicine(id: string){
    return this.httpCilent.get(this.Base_url + 'find/'+ id).toPromise().then(res => res as MedicineInfo);
  }
  //--xx
  MedicineDetail(id: string|null){
    return this.httpCilent.get(this.Base_url + 'finddetail/'+ id).toPromise().then(res => res as MedicineInfo);
  }

  //search
  searchType(typeid: number){
    return this.httpCilent.get(this.Base_url + 'searchtype/'+ typeid).toPromise().then(res => res as MedicineInfo[]);
  }
  searchKey(keyword: string){
    return this.httpCilent.get(this.Base_url + 'search/'+ keyword).toPromise().then(res => res as MedicineInfo[]);
  }
  
 //type
  MedicineType(){
    return this.httpCilent.get(this.Base_url + 'typemedicine').toPromise().then(res => res as MedicineTypeInfo[]);
  }
 AddTypeMedicine(type:MedicineTypeInfo){
  return this.httpCilent.post(this.Base_url+'addmedicinetype',type).toPromise().then(res=>res as MedicineTypeInfo);
 }
DeleteType(id:string|null){
  return this.httpCilent.delete(this.Base_url+'deletemedicinetype/'+id);
}
//
UploadFile(file:FormData){
  return this.httpCilent.post(this.Base_url + 'upload' , file ).toPromise().then(res => res as string);
 }
AddMedicine(medicine:MedicineInfo)
{
 return this.httpCilent.post(this.Base_url+'addmedicine',medicine).toPromise().then(res=>res as MedicineInfo);
}
UpdateMedicine(medicine:MedicineInfo){
  return this.httpCilent.post(this.Base_url+'updatemedicine',medicine).toPromise().then(res=>res as MedicineInfo);
}
deleteMedicine(id:string|null){
  return this.httpCilent.delete(this.Base_url+'deletemedicine/'+id);
}
}
