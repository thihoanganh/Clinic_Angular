import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class LoggedGuard implements CanActivate{
    constructor(private router:Router,private jwtHelper:JwtHelperService){}
    canActivate(){
        const token = localStorage.getItem('admin-jwt')
        if(token && !this.jwtHelper.isTokenExpired(token)) {
            this.router.navigate(['admin'])
            return false;
        }
        else {
            return true
        }
    }

}