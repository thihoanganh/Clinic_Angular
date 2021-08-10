import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Seminar } from 'src/app/models/seminar.model';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css','../../../assets/css/style.css']
})
export class CreateComponent implements OnInit {
  loading = false
  seminarContent!:any
  seminar!:Seminar
  file!:any
  @Output() notifyEvent = new EventEmitter()

  constructor(
    private seminarService:SeminarService,
    private router:Router,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
  }

  createSeminar(smnForm:any){
    this.loading = true
    this.seminar = smnForm.value
    this.seminar.content = this.seminarContent  
    this.seminar.poster = this.file
    this.seminarService.createSeminar(this.seminar)
    .subscribe(
      res=>{
        this.notifyEvent.emit() // event fire in parent component
        this.router.navigate(['admin/seminar/manage'])
      }
    )
  }

  setFile($event:any){
    this.file = $event.target.files[0]
  }

}
