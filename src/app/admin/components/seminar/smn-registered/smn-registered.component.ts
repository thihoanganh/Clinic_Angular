import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-smn-registered',
  templateUrl: './smn-registered.component.html',
  styleUrls: ['./smn-registered.component.css']
})
export class SmnRegisteredComponent implements OnInit {
  smnId=''
  listRegistered!:any
  constructor(
    private smnService:SeminarService,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.smnId = this.route.snapshot.params.id
    this.getAllRegistered()
  }

  getAllRegistered(){
    this.smnService.getRegistered(this.smnId)
    .subscribe(
      res=>{
        this.listRegistered = res.result
      }
    )
  }

}
