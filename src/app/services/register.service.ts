import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()

export class RegisterService{
    baseUrl = 'http://localhost:5000/api/'
    constructor(private http:HttpClient){}
    getAdminLogin(creditial:any):Observable<any>{
        return this.http.post<Observable<any>>(this.baseUrl+'staff/login',creditial,{observe:'body'})
    }
    getUserLogin(creditial:any):Observable<any>{
        return this.http.post<Observable<any>>(this.baseUrl+'user/login',creditial,{observe:'body'})
    }

    checkUserExist(username:any):Observable<any>{
        return this.http.get(this.baseUrl + `user/exist?username=${username}`,{observe:'body'} )
    }

    userRegister(user:User):Observable<any>{
        return this.http.post(this.baseUrl + 'user',user,{observe:'body'})
    }

    sentEmailCode(email:any):Observable<any>{
        return this.http.get(this.baseUrl+`user/verify?email=${email}`,{observe:'body'})
    }

    resetPassword(username:any,password:any):Observable<any>{
        const body = {username:username,password:password}
        return this.http.post(this.baseUrl+'user/password/update',body,{observe:'body'})
    }
}