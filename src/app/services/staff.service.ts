import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Position } from "../models/position.model";
import { Staff } from "../models/staff.model";

@Injectable()
export class StaffService{
    baseUrl = 'http://localhost:5000/api/staff'
    constructor(private http:HttpClient){}

    getAll(page:any):Observable<any>{
        return this.http.get(this.baseUrl+`?page=${page}`,{observe:'body'})
    }

    deleteStaff(id:any):Observable<any>{
        return this.http.delete(this.baseUrl+`/${id}`,{observe:'body'});
    }
    checkStaffExist(username:any):Observable<any>{
        return this.http.get(this.baseUrl + `/exist?username=${username}`,{observe:'body'} )
    }
    getAllPosition():Observable<any>{
        return this.http.get<any>(this.baseUrl+`/positions`,{observe:'body'})
    }
    createStaff(staff:Staff):Observable<any>{
        const body = {
            name:staff.name,
            dob:staff.dob,
            username:staff.username,
            password:staff.password,
            email:staff.email,
            wokingstart:staff.wokingStart,
            positionid:staff.positionid,
            roleid:2
        }
        return this.http.post(this.baseUrl,body,{observe:'body'})
    }
}