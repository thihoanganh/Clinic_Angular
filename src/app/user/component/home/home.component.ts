import { Component, OnInit } from "@angular/core";
import { Lecture } from "src/app/models/lecture.model";
import { Seminar } from "src/app/models/seminar.model";
import { LectureService } from "src/app/services/lecture.service";
import { SeminarService } from "src/app/services/seminar.service";



@Component({
    
    templateUrl: './home.component.html',
    styleUrls:['../../assets/css/custom.css']
})
export class HomeComponent implements OnInit{
  
    lectures = new Array()
    seminars = new Array<Seminar>()
    constructor(
        private lecService:LectureService,
        private smnService:SeminarService
        
        ){}
    ngOnInit(){
     this.getLectures()
     this.getSeminars()
    }

    getLectures(){
        this.lecService.getAllLectures(1).subscribe(res=>{
            this.lectures = res.result.slice(0,4)
        })
    }

    getSeminars(){
        this.smnService.getSeminars(1,'coming').subscribe(res=>{
            this.seminars = res.result.slice(0,3)
        })
    }
   
}