import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Seminar } from 'src/app/models/seminar.model';
import { SeminarService } from 'src/app/services/seminar.service';

@Component({
  selector: 'app-seminar',
  templateUrl: './seminar.component.html',
  styleUrls: ['./seminar.component.css']
})
export class SeminarComponent implements OnInit {
  seminarsPartOne = new Array<Seminar>()
  seminarsPartTwo = new Array<Seminar>()
  page = 1
  constructor(
    private seminarService: SeminarService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getSeminar(this.page);
  }

  getSeminar(page:any){
    this.seminarService.getSeminars(page)
    .subscribe(
      res=>{
        res.result.forEach((smn:any) => {
          smn.startAt = this.datePipe.transform(smn.startAt,'MMM dd,yyyy hh:mm')
          smn.endAt = this.datePipe.transform(smn.endAt,'MMM dd,yyyy hh:mm')

        });
        this.seminarsPartOne = res.result.splice(0,3)
        this.seminarsPartTwo = res.result
        console.log(this.seminarsPartTwo)
        

      }
    )
  }
}
