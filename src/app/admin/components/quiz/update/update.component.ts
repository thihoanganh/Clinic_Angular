import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { QuizCreateModel } from 'src/app/models/quiz-create.model';
import { LectureService } from 'src/app/services/lecture.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class QuizUpdateComponent implements OnInit {
  loading = false
  errorNotify =false
  lecId!:any
  lectures!:any
  searchTotalResult = 0
  questions = new Array<Question>()
  questionsDefault = new QuizCreateModel()
  quizId!:any
  lectureSelected!:any
  levelSelected!:any
  constructor(
    private lectureService:LectureService,
    private quizService:QuizService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.params.id
    this.setFormValue()
  }

  setFormValue(){
    this.quizService.getQuizById(this.quizId).subscribe(res=>{
      this.questionsDefault = res[0]
      this.lectureSelected = this.questionsDefault.lectureid
      this.levelSelected = this.questionsDefault.levelid
    })
  }

  updateQuiz(newQuizForm:any){
    this.loading = true
    const quiz = new QuizCreateModel()
    quiz.duration = newQuizForm.value.duration == "" ? this.questionsDefault.duration :  newQuizForm.value.duration
    quiz.levelid = parseInt( newQuizForm.value.levelid)
    quiz.lectureid =parseInt(newQuizForm.value.lectureid)
    const questionItems = document.querySelectorAll('.question-item')
    questionItems.forEach((question:any) => {
      const questionModel = new Question()
      const questionContent = question.querySelector('input[name="question"]').value
      const questionId = question.querySelector('input[name="questionid"]').value
      questionModel.name = questionContent
      questionModel.id = parseInt(questionId)
      const answerItems = question.querySelectorAll('.answer')
      answerItems.forEach((answer:any) => {
        const answerModel = new Answer()
        const answerContent = answer.querySelector('input[name="answer"]').value
        const answerId= answer.querySelector('input[name="answerid"]').value
        const isCorrect =  answer.querySelector('input[name="iscorrect"]').checked
        answerModel.content = answerContent
        answerModel.iscorrect = isCorrect
        answerModel.id = parseInt(answerId)
        questionModel.answers.push(answerModel)
      });
      this.questions.push(questionModel)
    });
    quiz.questions = this.questions
    quiz.totalQuestion = this.questions.length
    quiz.id = parseInt(this.quizId) 
    this.quizService.updateQuiz(quiz).subscribe(res=>{
      if(res.result == 'success'){
        this.router.navigate(['/admin/lecture/quiz'])
      }else{
        this.errorNotify = true
      }
      this.loading = false
    })
  }

  onSearchChange(event:any){
    this.lectureService.lectureSearch(event.target.value).subscribe(res=>{
      this.searchTotalResult = res.total_result
      this.lectures = res.result
    })
  }

  

}
