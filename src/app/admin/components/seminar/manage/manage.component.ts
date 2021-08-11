import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Seminar } from 'src/app/models/seminar.model';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  loading = false
  listSeminars = new Array<Seminar>()
  createdNotify = false
  mailContent = ''
  page = 1
  totalRegister = ''
  evaluates = new Array()



  constructor(
    private serminarService:SeminarService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.serminarService.getSeminars(this.page).subscribe(res=>{
      this.listSeminars = res.result
      this.listSeminars.forEach(s=>{
        s.startAt = this.datePipe.transform(s.startAt,'MM/dd/yyyy hh:mm')
        s.endAt = this.datePipe.transform(s.endAt,'MM/dd/yyyy hh:mm')
      })
    })
  }

  notifyEvent(){
    this.createdNotify = true
  }

  createMail(mailForm:any){

  }

  // getEvaluate(id:any){
  //   this.serminarService.getEvaluate(id).subscribe(res=>this.evaluates.push(res.percent))
  // }

}
