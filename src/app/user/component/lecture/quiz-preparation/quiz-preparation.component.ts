import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-quiz-preparation',
  templateUrl: './quiz-preparation.component.html',
  styleUrls: ['./quiz-preparation.component.css']
})
export class QuizPreparationComponent implements OnInit {
  totalQuestion!:any
  level!:any
  duration!:any
  lectureId!:any
  userId!:any
  quizId!:any
  showQuizInfo = false
  constructor(
    private lectureService:LectureService,
    private route:ActivatedRoute,
    private jwtHelper:JwtHelperService
  ) { }

  ngOnInit(): void {
    this.lectureId = this.route.snapshot.params.id
    const token = localStorage.getItem('user-jwt')
    const decode = this.jwtHelper.decodeToken(token!)
    this.userId =  decode.UserId
    this.lectureService.getRandomQuiz(this.userId,this.lectureId).subscribe(res=>{
      if(res.status == true){
        this.duration = res.result.duration
        this.level = res.result.level.name
        this.totalQuestion = res.total_question
        this.quizId = res.result.id
        this.showQuizInfo = true
      }else{
          
      }
    
    })
  }

}
