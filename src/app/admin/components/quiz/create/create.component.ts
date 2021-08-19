import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';
import { QuizCreateModel } from 'src/app/models/quiz-create.model';
import { Quiz } from 'src/app/models/quiz.model';
import { LectureService } from 'src/app/services/lecture.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateQuizComponent implements OnInit {
  loading = false
  errorNotify =false
  lecId!:any
  lectures!:any
  searchTotalResult = 0
  questions = new Array<Question>()
  constructor(
    private lectureService:LectureService,
    private quizService:QuizService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  createNewQuiz(newQuizForm:any){
    this.loading = true
    const quiz = new QuizCreateModel()
    quiz.duration = newQuizForm.value.duration
    quiz.levelid = parseInt( newQuizForm.value.levelid)
    quiz.lectureid =parseInt(newQuizForm.value.lectureid)
    const questionItems = document.querySelectorAll('.question-item')
    questionItems.forEach((question:any) => {
      const questionModel = new Question()
      const questionContent = question.querySelector('input[name="question"]').value
      questionModel.name = questionContent
      const answerItems = question.querySelectorAll('.answer')
      answerItems.forEach((answer:any) => {
        const answerModel = new Answer()
        const answerContent = answer.querySelector('input[name="answer"]').value
        const isCorrect =  answer.querySelector('input[name="iscorrect"]').checked
        answerModel.content = answerContent
        answerModel.iscorrect = isCorrect
        questionModel.answers.push(answerModel)
      });

      this.questions.push(questionModel)
    });
    quiz.questions = this.questions
    this.quizService.createQuiz(quiz).subscribe(res=>{
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

  removeQuestion(){
    const questionsWrapper = document.getElementById('question-container')
    questionsWrapper!.lastChild?.remove()
  }
  addAnswer(){
    const questionsWrapper = document.getElementById('question-container')
    const lastQuestionItems = questionsWrapper!.lastElementChild
    const answerWrapper = lastQuestionItems!.querySelector('#answer-wrapper')
    const answerItem = document.createElement('div')
    answerItem.classList.add('row','answer')

    answerItem.innerHTML = `  <div class="col-sm-1">
                                  <input type="checkbox" class="form-control" name="iscorrect">
                              </div>
                              <div class="col-sm-8">
                                  <input type="text" class="form-control" name="answer">
                              </div>`

    console.log(answerItem)
    answerWrapper!.appendChild(answerItem)
  }
  addQuestion(){
    const questionsWrapper = document.getElementById('question-container')
    const questionNode = document.createElement('div')
    questionNode.classList.add('question-item')
    questionNode.innerHTML = `<p>Question:</p>
    <input type="text" class="form-control" name="question" >
    <p>Answers:</p>
    <div id="answer-wrapper">
        <div class="row answer">
            <div class="col-sm-1">
                <input type="checkbox" class="form-control" name="iscorrect">
            </div>
            <div class="col-sm-8">
                <input type="text" class="form-control" name="answer">
            </div>
        </div>
        <div class="row answer">
            <div class="col-sm-1">
                <input type="checkbox" class="form-control" name="iscorrect">
            </div>
            <div class="col-sm-8">
                <input type="text" class="form-control" name="answer">
            </div>
        </div>
    </div>
    <hr>`
    questionsWrapper!.appendChild(questionNode)
  }
}

