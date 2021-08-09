import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";

@Injectable()

export class LoginService{
    baseUrl = 'http://localhost:5000/api/'
    constructor(private http:HttpClient){}
    getAdminLogin(creditial:any):Observable<any>{
        return this.http.post<Observable<any>>(this.baseUrl+'staff/login',creditial,{observe:'body'})
    }
    getUserLogin(creditial:any):Observable<any>{
        return this.http.post<Observable<any>>(this.baseUrl+'user/login',creditial,{observe:'body'})
    }
}