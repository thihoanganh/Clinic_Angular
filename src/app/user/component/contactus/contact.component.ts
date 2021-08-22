import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";



@Component({
    
    templateUrl: './contact.component.html'
})
export class ContactUsComponent implements OnInit{
    alertFlag = false
    constructor(
        private userService:UserService
    ){}
    ngOnInit(){
     
    }
   
    createMailSupport(mailForm:any){
        this.userService.createMailSupport(mailForm.value).subscribe(res=>{
            this.alertFlag = true
            mailForm.reset()
        })
    }
}