import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  smnId = ''
  mailContent = ''
  mailTitle = ''
  flagCreate = false
  mailId = ''
  constructor(
    private route: ActivatedRoute,
    private seminarService:SeminarService,
    private router:Router
    
    ) { }

  ngOnInit(): void {
    this.smnId  = this.route.snapshot.params['id']
    this.seminarService.getSeminarMail(this.smnId)
    .subscribe(
      res=>{
        if(res.emails==null){
          this.mailContent = ''
          this.mailTitle = ''
          this.flagCreate = true
        }else{
          this.mailContent = res.emails.content
          this.mailTitle = res.emails.title
          this.mailId = res.emails.id
          this.flagCreate = false
        }
      }
    )
  }

  createMail(mailForm:any){
    if(this.flagCreate){
      this.seminarService.createMail(this.mailTitle,this.mailContent,this.smnId)
      .subscribe(res=>{
        this.router.navigate(['/admin/seminar/manage'])
      })
    }else{
      this.seminarService.updateMail(this.mailTitle,this.mailContent,this.smnId,this.mailId)
      .subscribe(res=>{
        this.router.navigate(['/admin/seminar/manage'])
      })
    }
  }

}
