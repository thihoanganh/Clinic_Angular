import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../services/login.service';
import { ViewChild, ElementRef} from '@angular/core';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { RegisterService } from '../services/register.service';
import { User } from '../models/user.model';
import { DetailLectureComponent } from './component/lecture/detail-lecture/detail-lecture.component';
import { Router } from '@angular/router';

@Component({
    templateUrl: './user.component.html',
    styleUrls:['./assets/css/custom.css']
})

export class UserComponent implements OnInit {
    username!:string
    loading:boolean = false
    creditial = {username:'',password:''}
    isInValid:boolean = false
    isDisplayLoginModal = false
    isDisplayResetPwForm = false
    usernameExist = false
    userRegiser!:User
    registerSuccessNotify = false
    registerFailureNotify= false
    verifyCode!:any
    verifyCodeInput = new Array<any>()
    isVerified = false
    verifyFailureNotify = false
    verifySuccessNotify = false
    checkUsernameFailure = false
    checkUsernameSuccess = false
    msgSentMail = ''
    sentMailTo = ''
    enableBtnSentMail = false
    usernameResetPassword = ''
    resetSuccessNotify = false
    resetFailureNotify = false

  
    @ViewChild('closeModal') closeModal!: ElementRef;
    @ViewChild('btnLogin') btnLogin!: ElementRef;
    @ViewChild('closeForgotModal') closeForgotModal!: ElementRef;
    @ViewChild('closeResetPasswordModal') closeResetPasswordModal!: ElementRef;


    
    constructor(
        private jwtHelper:JwtHelperService,
        private loginService:LoginService,
        private registerService:RegisterService,
        private router:Router
        
    ) { }

    ngOnInit() {
    }

    isAuthenticated(){
        const token = localStorage.getItem('user-jwt')
        if(token && !this.jwtHelper.isTokenExpired(token)){
            var decodeToken = this.jwtHelper.decodeToken(token)
            this.username = decodeToken.Username
            return true
        }
        else return false
    }
    logOut(){
        localStorage.removeItem('user-jwt')
        this.router.navigate(['/'])
    }

    login(loginForm:any){
        this.loading = true
        this.creditial.username = loginForm.value.username
        this.creditial.password = loginForm.value.password
        this.loginService.getUserLogin(this.creditial)
        .subscribe(
            res=>{
                localStorage.setItem('user-jwt',res.token)
                this.isInValid = false
                this.loading = false
                this.closeModal.nativeElement.click() // close modal
                loginForm.reset()
            },
            err=>{
                this.isInValid = true
                this.loading = false
            }

        )
    }
    register(registerForm:any){
        this.loading = true
        this.registerService.checkUserExist(registerForm.value.username)
        .subscribe(
            res=>{
                console.log(registerForm.value.username)
                if(res.exist){
                    // username exist !
                    this.usernameExist = true
                    this.loading = false
                }else{
                    // register ...
                    this.usernameExist = false
                    this.userRegiser = registerForm.value
                    this.registerService.userRegister(this.userRegiser)
                    .subscribe(
                        res=>{
                           if(res.result=='success'){
                               registerForm.reset() // clear form
                                this.registerSuccessNotify = true
                           }else{
                            this.registerFailureNotify = true
                           } 
                            this.loading = false

                        }
                    )

                }
            }
        )
    }
    
    checkUsername(fun:any){
        // check username 
        this.loading = true
        this.registerService.checkUserExist(fun.value)
        .subscribe(
            res=>{
                if(res.exist){
                    //username exist
                     this.msgSentMail = `We will sent code verify to email ${res.email}`
                     this.checkUsernameSuccess = true
                     this.checkUsernameFailure = false
                     this.sentMailTo = res.email
                     this.enableBtnSentMail = true
                     this.usernameResetPassword = fun.value
                     this.loading = false
                }else{
                    this.checkUsernameFailure = true
                    this.loading = false
                }
            }
        )
    }
    sentEmailCode(forgotForm:any){
        this.loading = true
        this.registerService.sentEmailCode(this.sentMailTo)
                    .subscribe(
                        res=> {
                            this.closeForgotModal.nativeElement.click() // close current forgot modal
                            this.verifyCode = res.code
                            this.loading = false
                        }
                    )
    }
    
    verify(verifyForm:any){
        this.verifyCodeInput = Object.keys(verifyForm.value).map(function(v){return verifyForm.value[v]})
        if(this.verifyCodeInput.join('')==this.verifyCode) 
        {
            //verify success
            this.isVerified = true
            this.isDisplayResetPwForm = true // enable form reset pw
            this.verifyFailureNotify = false
            this.verifySuccessNotify = true
           
        }
        else{
            verifyForm.reset() //clear data input
            this.verifyFailureNotify = true
            this.verifySuccessNotify = false
        }


    }
    updateNewPw(newPwForm:any){
        this.loading = true
        this.registerService.resetPassword(this.usernameResetPassword,newPwForm.value.password)
        .subscribe(
            res=>{
                if(res.status){
                    this.resetSuccessNotify = true
                    this.resetFailureNotify = false
                    this.loading = false
                    this.closeResetPasswordModal.nativeElement.click()
                    alert('Reset successfully !')
                }
                else{
                    this.resetFailureNotify = true
                    this.loading = false
                }
            }
        )
    }

    onActivate(event:any){
       if(event instanceof DetailLectureComponent){
           event.childrenEvent.subscribe(()=>{
                this.btnLogin.nativeElement.click()
           })
       }
    }

   
}