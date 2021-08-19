import { ElementRef, HostListener, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-quiz-examination',
  templateUrl: './quiz-examination.component.html',
  styleUrls: ['./quiz-examination.component.css']
})
export class QuizExaminationComponent implements OnInit {
  userId!:any
  quizId!:any
  duration!:number
  interval!:any
  selected = new Array()
  questions = new Array
  questionName!:any
  questionId!:any
  buttonNextDisabled = false
  buttonPrevDisabled = false
  showBtnSubmit = true
  correctAnswers!:any
  noAnswers!:any
  percent!:any
  answers = new Array()
  index = 0


  constructor(
    private route:ActivatedRoute,
    private lecService:LectureService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.quizId = this.route.snapshot.paramMap.get('quizid')
    this.userId = this.route.snapshot.paramMap.get('userid')
    this.lecService.getQuizById(this.quizId).subscribe(res=>{
      this.duration = res[0].duration
      this.lecService.getQuizById(this.quizId).subscribe(res=>{
        this.questions = res[0].questions
        this.InitializeQuestion()
        this.setCountDown()
      })
    })
  }
  @ViewChild('resultModal') resultModal!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  

  //clear interval when user clicking in back button
  @HostListener('window:popstate', ['$event'])
  onPopState(event:any) {
    clearInterval(this.interval);
  }


  setCountDown(){
    // Set the date we're counting down to
  var countDownDate = new Date().getTime() + this.duration*60000

  // Update the count down every 1 second
    this.interval = setInterval(() => {

    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
    document.getElementById('clock')!.innerHTML = minutes +':'+ String(seconds).padStart(2,'0') 
      
    // If the count down is over, write some text 
    if (distance < 0) {
      //timeout  
      document.getElementById('clock')!.innerHTML = 'Time out !'
      this.submit()
    }
  }, 1000);
  }

  InitializeQuestion(){
      this.buttonNextDisabled = this.index == this.questions.length -1 ? true : false
      this.buttonPrevDisabled = this.index == 0 ? true : false
      this.showBtnSubmit = this.index == this.questions.length -1 ? false : true
      this.questionName = this.questions[this.index].name
      this.questionId = this.questions[this.index].id
      this.answers = this.questions[this.index].answers
  }
  answerChange(event:any){
    const answerId = event.target.value
    this.selected[this.index] = parseInt(answerId)
  }
  prev(){
    this.index--
    this.InitializeQuestion()
  }

  next(){
    this.index++
    this.InitializeQuestion()
  }

  submit(){
    clearInterval(this.interval);
    this.lecService.submitQuiz(this.userId,this.quizId,this.selected).subscribe(res=>{
      this.correctAnswers = res.result.correct_answer
      this.noAnswers = res.result.no_answer
      this.percent = res.result.percent
      this.resultModal.nativeElement.click()
    })
  }

  redirection(){
    console.log(this.closeModal)
    this.closeModal.nativeElement.click()
    this.router.navigate(['/lecture'])
  }
   
}
