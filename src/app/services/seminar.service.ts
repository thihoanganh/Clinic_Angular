import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { RegisterSeminar } from "../models/register-smn.model";
import { Seminar } from "../models/seminar.model";

@Injectable()

export class SeminarService{
    baseUrl = 'http://localhost:5000/api/seminar'
    constructor(
        private http:HttpClient
    ){}
    
    getSeminars(page:any,filter:any):Observable<any>{
        return this.http.get(this.baseUrl+`?page=${page}&filter=${filter}`,{observe:'body'})
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

    getSmnDetail(id:any):Observable<any>{
        return this.http.get(this.baseUrl+`/${id}`,{observe:'body'})
    }

    registerSeminar(register:RegisterSeminar):Observable<any>{
        const body = {
            fname:register.fname,
            phone:register.phone.toString(),
            gender:register.gender=="1"?true:false,
            email:register.email,
            seminarid:register.seminarid
        }
        return this.http.post(this.baseUrl+'/register',body,{observe:'body'})
    }

    getRegistered(id:any):Observable<any>{
        return this.http.get(this.baseUrl + `/${id}/registers`,{observe:'body'})
    }

    sendFeedback(content:any,feeling:any,smnId:any,percent:any){
        const body = {
            content : content,
            satisfiedpercent: percent,
            feeling: feeling,
            seminarid:smnId
        }
        return this.http.post(this.baseUrl+'/feedback',body,{observe:'body'})
    }

    getEvaluate(id:any):Observable<any>{
        return this.http.get(this.baseUrl+`/${id}/evaluate`,{observe:'body'})
    }

    getAllFeedbacks(smnId:any):Observable<any>{
        return this.http.get(this.baseUrl+`/${smnId}/feedbacks`,{observe:'body'})
    }
}