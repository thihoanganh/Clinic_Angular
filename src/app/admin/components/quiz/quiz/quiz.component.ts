import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { LectureService } from 'src/app/services/lecture.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  loading = false
  page = 1
  msg = ''
  quizzes  = new Array<Quiz>()
  lectures = new Array()
  searchTotalResult = 0
  notify = false
  totalPage!:any
  totalQuiz!:any
  delNotify = false
  delId!:any
  disablePagination = false
  @ViewChild('confirmModal') confirmModal!: ElementRef;
  @ViewChild('closeConfirmModal') closeConfirmModal!: ElementRef;
  

  
  constructor(
    private quizService:QuizService,
    private lectureService:LectureService
  ){}

  ngOnInit(): void {
    this.getAllQuiz(this.page)
  }
  getAllQuiz(page:any){
    this.quizService.getAllQuiz(page).subscribe(res=>{
      this.quizzes = res.result
      this.totalPage  = res.total_page
      this.totalQuiz = res.total_quiz
    })
  }

  getQuizByPage(inputPage:any){
    this.getAllQuiz(inputPage.value.page)
  }

  showConfirm(id:any){
    this.delId = id
    this.confirmModal.nativeElement.click()
  }
  deleteQuiz(){
    this.loading = true
    this.quizService.deleteQuiz(this.delId).subscribe(res=>{
      this.delNotify = true
      this.msg = 'Delete successfully !'
      setTimeout(() => {
      this.getAllQuiz(this.page)
      this.closeConfirmModal.nativeElement.click()
      this.loading = false
      }, 300);
    })
  }

  onSearchChange(event:any){
    this.lectureService.lectureSearch(event.target.value).subscribe(res=>{
      this.searchTotalResult = res.total_result
      this.lectures = res.result
    })
  }

  filterQuiz(event:any){
    if(event.target.value==0){
      this.getAllQuiz(this.page)
      this.disablePagination = false
    }else{
      this.quizService.getQuizByLectureId(event.target.value).subscribe(res=>{
        this.quizzes = res.quizzes
        this.disablePagination = true
      })
    }
    
  }
}
