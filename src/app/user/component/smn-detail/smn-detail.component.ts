import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterSeminar } from 'src/app/models/register-smn.model';
import { Seminar } from 'src/app/models/seminar.model';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-smn-detail',
  templateUrl: './smn-detail.component.html',
  styleUrls: ['./smn-detail.component.css']
})
export class SmnDetailComponent implements OnInit {
  loading = false
  smnModel!:Seminar
  id = ''
  showFeedback = true
  registerForm!:RegisterSeminar
  registerSuccessNotify = false
  gender!:any
  percent = 50
  fbNotify = false

  @ViewChild('registerFormModal') registerFormModal!: ElementRef;
  @ViewChild('fbFormModal') fbFormModal!: ElementRef;

  constructor(
    private smnService:SeminarService,
    private route: ActivatedRoute,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.getSeminar()
    
  }

  getSeminar(){
    this.smnService.getSmnDetail(this.id)
    .subscribe(
      res=>{
        res.startAt =  this.datePipe.transform(res.startAt,'MMM dd,yyyy hh:mm')
        res.endAt =  this.datePipe.transform(res.endAt,'MMM dd,yyyy hh:mm')
        this.smnModel = res
        this.isClosedSeminar()
      }
    )
  }

  isClosedSeminar(){
    let now = new Date()
    let smnEnd = new Date(this.smnModel.endAt)
    if(smnEnd < now ){
      this.showFeedback = false
    }
  }

  registerSmn(registerForm:any){
    this.loading = true
    this.registerForm = registerForm.value
    this.registerForm.seminarid = this.smnModel.id
    
    this.smnService.registerSeminar(this.registerForm)
    .subscribe(res=>{
      this.registerFormModal.nativeElement.click()
      this.registerSuccessNotify = true
      this.loading = false
    })
   
  }
  sentFeedback(fbForm:any){
    this.smnService.sendFeedback(fbForm.value.opinion,fbForm.value.feeling,this.id,fbForm.value.percent)
    .subscribe(
      res=>{
        this.fbNotify = true
        this.fbFormModal.nativeElement.click()

      }
    )

  }

}
