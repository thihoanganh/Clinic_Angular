import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { Seminar } from "../models/seminar.model";

@Injectable()

export class SeminarService{
    baseUrl = 'http://localhost:5000/api/seminar'
    constructor(
        private http:HttpClient
    ){}
    
    getSeminars():Observable<any>{
        return this.http.get(this.baseUrl,{observe:'body'})
    }
    
    createSeminar(smn:Seminar):Observable<any>{
        const body = {
            title : smn.title,
            speaker: smn.speaker,
            method : smn.method,
            content: smn.content,
            place: smn.place,
            startat:smn.startAt,
            endat:smn.endAt,
            contact:smn.contact
        }

        const formData = new FormData();
        formData.append('seminar',JSON.stringify(body))
        formData.append('poster',smn.poster)

        return this.http.post(this.baseUrl,formData,{observe:'body'})
    }

    getSeminarMail(smnId:any):Observable<any>{
        return this.http.get(this.baseUrl+`/${smnId}/emails`,{observe:'body'})
    }

    createMail(title:any,content:any,smnId:any){
        const body = {
            title:title,
            content : content,
            seminarid:smnId
        }
        return this.http.post(this.baseUrl+`/${smnId}/email`,body,{observe:'body'})
    }

    updateMail(title:any,content:any,smnId:any,mailId:any):Observable<any>{
        const body = {
            title:title,
            content : content,
            seminarid:smnId,
            id:mailId
        }
        return this.http.put(this.baseUrl + '/email',body,{observe:'body'})
    }
}