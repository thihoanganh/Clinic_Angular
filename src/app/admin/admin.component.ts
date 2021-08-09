import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
    templateUrl: 'admin.component.html',
     styleUrls:[
       './assets/css/bootstrap.min.css',
       './assets/css/light-bootstrap-dashboard.css',
       './assets/css/style.css'
 ]
})

export class AdminComponent implements OnInit {
    username!:string
    role!:string
    constructor(
        private jwtHelper:JwtHelperService,
        private router:Router
    ) { }

    ngOnInit() {
      this.getUserInfo()
    }

    getUserInfo(){
      const token = localStorage.getItem('admin-jwt')
      if(token && !this.jwtHelper.isTokenExpired(token)){
        var decodeToken = this.jwtHelper.decodeToken(token)
        this.username = decodeToken.Username
        this.role = decodeToken.IsAdmin == "true" ? "Supper Admin" : "Staff"
      }
    }

    logOut(){
        localStorage.removeItem('admin-jwt')
        this.router.navigate(['admin/login'])
    }


}