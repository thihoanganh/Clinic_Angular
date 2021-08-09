import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class UserService{
    baseUrl = 'http://localhost:5000/api/user'
    constructor(private http:HttpClient){}

    getAll(page:any):Observable<any>{
        return this.http.get(this.baseUrl+`?page=${page}`,{observe:'body'})
    }

    deleteUser(id:any):Observable<any>{
        return this.http.delete(this.baseUrl+`/${id}`,{observe:'body'});
    }
}