import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MailSupport } from "../models/mailsupport.model";

@Injectable()
export class UserService{
    baseUrl = 'http://localhost:5000/api/user'
    baseUrlMail = 'http://localhost:5000/api/supportmail'

    constructor(private http:HttpClient){}

    getAll(page:any):Observable<any>{
        return this.http.get(this.baseUrl+`?page=${page}`,{observe:'body'})
    }

    deleteUser(id:any):Observable<any>{
        return this.http.delete(this.baseUrl+`/${id}`,{observe:'body'});
    }

    createMailSupport(ms:MailSupport):Observable<any>{
        return this.http.post(this.baseUrlMail,ms,{observe:'body'})
    }

    getAllSupportMail():Observable<any>{
        return this.http.get(this.baseUrlMail,{observe:'body'})
    }
}