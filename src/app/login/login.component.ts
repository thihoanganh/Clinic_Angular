import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls:['./assets/css/main.css','./assets/css/util.css','./assets/css/style.css']
})

export class AdminLoginComponent implements OnInit {
    creditial:any = {username:'',password:''}
    isInValid:boolean = false
    loading:boolean = false
    constructor(
        private loginService:LoginService,
        private router:Router
    ) { }

    ngOnInit() {
    }

    login(loginForm:any){
        this.loading = true
        this.creditial.username = loginForm.value.username
        this.creditial.password = loginForm.value.password
        this.loginService.getAdminLogin(this.creditial)
        .subscribe(
            res=>{
                localStorage.setItem('admin-jwt',res.token)
                this.isInValid = false
                this.loading = false
                this.router.navigate(['admin'])  
            },
            err=>{
                this.isInValid = true
                this.loading = false
            }

        )
    }
}