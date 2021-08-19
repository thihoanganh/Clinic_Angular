import { Component, OnInit } from '@angular/core';
import { Lecture } from 'src/app/models/lecture.model';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-main-lecture',
  templateUrl: './main-lecture.component.html',
  styleUrls: ['./main-lecture.component.css']
})
export class MainLectureComponent implements OnInit {
  page = 1
  lectures = new Array<Lecture>()
  categories!:any
  totalPage!:any
  paginateRange!:any
  dislayPagination = true
  constructor(
    private lectureService:LectureService
  ) { }

  ngOnInit(): void {
    this.getAllLectures(this.page)
    this.lectureService.getAllCates().subscribe(res=>this.categories=res.categories)
  }

  getAllLectures(page:any){
    this.lectureService.getAllLectures(page).subscribe(res=>{
      this.lectures = res.result
      this.totalPage = res.totalPage       
      this.paginateRange =  this.range(this.totalPage < 3 ? this.totalPage : 3,1)
    })
  }

  filterLecture(event:any){
    if(event.target.value=='all'){
      this.lectureService.getAllLectures(this.page).subscribe(res=>{
        this.lectures = res.result
        this.dislayPagination = true
      })
    }else{
      this.lectureService.getAllLectureByCateId(event.target.value).subscribe(res=>{
        this.lectures = res.result
        this.dislayPagination =false
      })
    }
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
    this.lectureService.getAllLectures(this.page).subscribe(res=>{
      this.lectures = res.result
      this.totalPage = res.totalPage  
      this.paginateRange = this.range(this.totalPage < 3 ? this.totalPage : 3,this.page == 1 ? 1 : this.page - 1)
      console.log(this.paginateRange)
    })
  }


  range(size:any, startAt:any) {
    return [...Array(size).keys()].map(i => i + startAt);
}

}
