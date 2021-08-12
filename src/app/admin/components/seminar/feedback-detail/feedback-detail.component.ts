import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
  smnId!:any
  feedbacks!:any
  constructor(
    private route:ActivatedRoute,
    private smnService:SeminarService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.smnId = this.route.snapshot.params.id
    this.getFeedbacks()
  }

  getFeedbacks(){
    this.smnService.getAllFeedbacks(this.smnId)
    .subscribe(res=>{
      this.feedbacks = res.result
      this.feedbacks.forEach((fb:any) => {
          fb.createdDate  = this.datePipe.transform(fb.createdDate,'MMM dd,yyyy hh:mm')
      });
    })
  }

}
