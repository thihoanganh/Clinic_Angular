import { Component, OnInit } from '@angular/core';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  seminars!:any
  page = 1 
  constructor(
    private smnService:SeminarService
  ) { }

  ngOnInit(): void {
    this.getAllSmns(this.page)
  }

  getAllSmns(page:any){
    this.smnService.getSeminars(page,'all')
    .subscribe(res=>{
      this.seminars = res.result
    })
  }
}
