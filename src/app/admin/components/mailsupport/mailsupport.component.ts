import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mailsupport',
  templateUrl: './mailsupport.component.html',
  styleUrls: ['./mailsupport.component.css']
})
export class MailsupportComponent implements OnInit {
  emailSupports!:any
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAllSupportMail().subscribe(res=>{
      this.emailSupports = res
    })
  }

}
