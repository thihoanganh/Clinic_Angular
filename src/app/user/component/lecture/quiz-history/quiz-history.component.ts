import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-quiz-history',
  templateUrl: './quiz-history.component.html',
  styleUrls: ['./quiz-history.component.css']
})
export class QuizHistoryComponent implements OnInit {
  quizzes!:any
  userId!:any
  constructor(
    private route:ActivatedRoute,
    private lecService:LectureService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id
    this.lecService.getUserQuiz(this.userId).subscribe(res=>{
      this.quizzes = res
    })

  }

  getAllQuizzesOfUser(){

  }

}
