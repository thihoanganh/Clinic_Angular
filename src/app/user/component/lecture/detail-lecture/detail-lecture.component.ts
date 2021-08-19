import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Lecture } from 'src/app/models/lecture.model';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-detail-lecture',
  templateUrl: './detail-lecture.component.html',
  styleUrls: ['./detail-lecture.component.css']
})
export class DetailLectureComponent implements OnInit {
  lectureId!:any
  displayDownload = false
  dislayQuizNow = false
  lecture = new Lecture()
  userId!:any
  userName!:any
  comments!:any
  @Output() childrenEvent: EventEmitter<any> = new EventEmitter();

  
  constructor(
    private route:ActivatedRoute,
    private lectureService:LectureService,
    private jwtHelper:JwtHelperService
  ) { }

  ngOnInit(): void {
    this.lectureId = this.route.snapshot.params.id
    this.lectureService.getLetureById(this.lectureId).subscribe(res=>{
      this.lecture = res.result[0]
    })
    this.lectureService.getAttachments(this.lectureId).subscribe(res=>{
      if(res.count>0) this.displayDownload =true
    })
    this.lectureService.getQuizByLectureId(this.lectureId).subscribe(res=>{
      if(res.count!=0) {
        this.dislayQuizNow = true
      }
    })

    this.lectureService.getLectureComments(this.lectureId).subscribe(res=>{
      this.comments = res.cmts
    })
  }

  createQuiz(){
    const token = localStorage.getItem('user-jwt')
    if(!(token && !this.jwtHelper.isTokenExpired(token))){
      this.childrenEvent.emit()
    }
  }

  createComment(){
    const token = localStorage.getItem('user-jwt')
    const content = document.getElementsByTagName('textarea')[0].value
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      this.userId = this.jwtHelper.decodeToken(token!).UserId
      this.userName = this.jwtHelper.decodeToken(token!).Username
      this.lectureService.createComment(this.userId,this.lectureId,content).subscribe(res=>{
        const commentContainer = document.getElementsByClassName('comment-area')[0]
        const divNode = document.createElement('div')
        divNode.classList.add('comment')
        divNode.style.marginBottom = '30px'
        const imgNode = document.createElement('img')
        imgNode.setAttribute('src','../../../assets/images/no-avatar.png')
        imgNode.classList.add('avatar')
        imgNode.style.width = '40px'
        imgNode.style.height = '40px'
        imgNode.style.borderRadius = '50%'
        imgNode.style.display = 'table-row-group'
        imgNode.style.float = 'left'
        imgNode.style.marginRight = '5px'
        const spanNodeUsername = document.createElement('span')
        spanNodeUsername.innerHTML = `<b>${this.userName}: </b>`
        const spanNodeContent = document.createElement('span')
        spanNodeContent.innerHTML = `${content}`
        const pNode = document.createElement('p')
        pNode.innerHTML = `<i>Just now...</i>`
        divNode.appendChild(imgNode)
        divNode.appendChild(spanNodeUsername)
        divNode.appendChild(spanNodeContent)
        divNode.appendChild(pNode)
        commentContainer.insertBefore(divNode,commentContainer.childNodes[0])
        document.getElementsByTagName('textarea')[0].value = '' //clear textarea
      })
    }else{
      this.childrenEvent.emit()
    }
    
  }

  // enableBtnSent(){
  //   const content = document.getElementsByTagName('textarea')[0].value
  //   if(content.length < 5 ) (document.getElementById('SentComment') as (Node)).disabled = true
  // }
}
