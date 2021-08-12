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
  totalPage!:any
  paginateRange!:any
  selectedFilter = 'all'
  constructor(
    private seminarService: SeminarService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {
    this.getSeminar(this.page);
  }

  getSeminar(page:any){
    this.seminarService.getSeminars(page,'all')
    .subscribe(
      res=>{
        res.result.forEach((smn:any) => {
          smn.startAt = this.datePipe.transform(smn.startAt,'MMM dd,yyyy hh:mm')
          smn.endAt = this.datePipe.transform(smn.endAt,'MMM dd,yyyy hh:mm')

        });
        this.seminarsPartOne = res.result.splice(0,3)
        this.seminarsPartTwo = res.result
        this.totalPage = res.totalPage       
        this.paginateRange =  this.range(this.totalPage < 3 ? this.totalPage : 3,1) 
      }
    )
  }

  getPaginationData(event:any){
    this.page = event.target.textContent
    this.handlePagination()
  }

  getFirstData(){
    this.page = 1
    this.handlePagination()
  }

  getLastData(){
    this.page = this.totalPage
    this.handlePagination()
  }

  handlePagination(){
    this.seminarService.getSeminars(this.page,this.selectedFilter).subscribe(res=>{
      this.seminarsPartOne = res.result.splice(0,3)
      this.seminarsPartTwo = res.result
      this.totalPage = res.totalPage  
      this.paginateRange = this.range(this.totalPage < 3 ? this.totalPage : 3,this.page == 1 ? 1 : this.page - 1)
    })
  }

  onChange(event:any){
    this.selectedFilter = event.target.value
    this.getFirstData()
  }


  range(size:any, startAt:any) {
    return [...Array(size).keys()].map(i => i + startAt);
}
}
