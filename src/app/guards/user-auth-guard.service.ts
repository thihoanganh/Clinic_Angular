import {  Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable()
export class UserAuthGuard implements CanActivate{
    constructor(private jwtHelper:JwtHelperService,private router:Router){}
    canActivate(){
        const token = localStorage.getItem('user-jwt')
        if(token && !this.jwtHelper.isTokenExpired(token)) {
            return true
        }
        else {
            return false
        }
    }

}