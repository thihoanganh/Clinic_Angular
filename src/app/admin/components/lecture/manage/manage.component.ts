import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Attachment } from 'src/app/models/attach.model';
import { Lecture } from 'src/app/models/lecture.model';
import { LectureService } from 'src/app/services/lecture.service';
import * as $ from 'jquery'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageLectureComponent implements OnInit {
  lectures  = new Array<Lecture>()
  loading = false
  lecId!:any
  page = 1
  totalPage!:any
  totalLectures!:any
  delLectureSuccess = false
  lectureAttachs = new Array<Attachment>()
  removeItems = new Array()
  newItems = new Array()
  addCount = 0
  removeCount = 0
  errorCount = 0
  updateMsg!:any
  attach!:any
  comments!:any

  @ViewChild('showNotify') showNotify!: ElementRef;
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeCmtModal') closeCmtModal!: ElementRef;



  

  constructor(
    private lecService:LectureService,
    private datePipe:DatePipe,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.getLectures(this.page)
    
    
  }
  
  getLectures(pageInput:any){
    this.loading = true
    this.lecService.getAllLectures(pageInput).subscribe(res=>{
      this.lectures = res.result
      this.totalPage = res.totalPage
      this.totalLectures = res.totalLectures
      this.lectures.forEach(lec => {
        lec.createddate = this.datePipe.transform(lec.createddate, 'MMM dd,yyyy hh:mm')
        lec.modifydate = this.datePipe.transform(lec.modifydate, 'MMM dd,yyyy hh:mm')
        this.loading = false
      });
    })
  }
  getDataByPage(pageInput:any){
    this.getLectures(pageInput.value.page)
  }

  deleteLec(id:any){
    if(confirm('Are you sure to delete?')){
      this.lecService.deleteLecture(id).subscribe(res=>this.delLectureSuccess = true)
      setTimeout(() => {
      this.getLectures(this.page)
      }, 500);
    }
  }

  saveAttach(){
    //delete attach
    const deleteTask = new Promise((resolve) =>{
      this.loading = true
      this.removeItems.forEach(itemId=>{
        this.lecService.deleteAttach(itemId).subscribe(
          res=>{
            this.removeCount = this.removeCount + 1
          },
          err=>{
            this.errorCount = this.errorCount + 1
          }
        )
      })
       resolve('')
    })

    const addTask = new Promise((resolve)=>{
      //add new attach
      this.newItems.forEach(item=>{
        this.lecService.createAttach(this.lecId,item).subscribe(
          res=>{
            this.addCount = this.addCount + 1
          },
          err=>{
            this.errorCount = this.errorCount + 1
          }
        )
      })
      resolve('')
    })

    Promise.all([deleteTask,addTask])
    .then(()=>{
      return new Promise((resolve)=>{
        setTimeout(() => {
          this.getLectures(this.page) // reload
          this.closeModal.nativeElement.click() // close current modal
          this.loading = false
          resolve('')
        }, 2000);
      })
    }).then(res=>{
      this.showNotify.nativeElement.click() /// show notify
    })

  }

  reload(){
    this.getDataByPage(this.page)
  }

  addNewForm(){
    const modal = document.getElementsByClassName('form-group')[0]
    const formNode =  document.createElement('div')
    formNode.innerHTML = `<input type="file" class="form-control new-item new-item-add" ngModel name="attach" id="recipient-name" required>`
    formNode.classList.add('form-group')
    modal.parentNode?.insertBefore(formNode,modal.lastChild!.nextSibling)
    // load event when clicking btn add new item 
    const items = this.elementRef.nativeElement.querySelectorAll('.new-item')
    items.forEach((item:any) => {
      if(item){
        item.addEventListener("change",(event:any)=>{
          if(this.newItems.some(item=> item.name == event.target.files[0].name)){
            alert('File already exist')
          }else{
            this.newItems.push(event.target.files[0])
          }
      });
      }
    });


  }

  addItem(event:any){
    if(this.newItems.some(item=> item.name == event.target.files[0].name)){
      alert('File already exist')
      event.value = ''
    }else{
      this.newItems.push(event.target.files[0])
      console.log(this.newItems)
    }
  }

  setAttach(id:any){
    this.addCount = 0
    this.removeCount = 0 
    this.errorCount = 0 
    this.updateMsg = ''
    this.lecId = id
    this.clearArray(this.removeItems)
    this.clearArray(this.newItems)
    this.clearArray(this.lectureAttachs) // clear array data
    document.getElementsByClassName('dynamic-form')[0].innerHTML = '' // clear data of div contains current attach
    this.lecService.getLectureAttachs(id).subscribe(res=>{
      this.lectureAttachs = res.result
      this.lectureAttachs.forEach(attach => {
        const targetNode = document.getElementsByClassName('dynamic-form')[0]
        const attachNode =  document.createElement('div')
        const ext = this.getExtension(attach.original_name)
        attachNode.classList.add('item')
        attach.name = `http://localhost:5000/lecture/attach/${attach.name}`
        if(attach.type.startsWith('image')){
          attachNode.innerHTML = `
            <p><b>File:&nbsp;</b>${attach.original_name}</p>
            <i id="${attach.id}" class="fas fa-backspace text-danger btn btn-remove"></i>
            <img src="${attach.name}" width="100px"/>
            <hr>
           `
           
        }else if(attach.type.startsWith('audio')){
          attachNode.innerHTML = `
          <p><b>File:&nbsp;</b>${attach.original_name}</p>
          <i  id="${attach.id}" class="fas fa-backspace text-danger btn btn-remove"></i>
          <audio controls>
          <source src="${attach.name}" type="audio/ogg">
          </audio>
          <hr>
          `
        } else if(attach.type.startsWith('video')){
          attachNode.innerHTML = `
          <p><b>File:&nbsp;</b>${attach.original_name}</p>
          <i  id="${attach.id}" class="fas fa-backspace text-danger btn btn-remove"></i>
          <video width="320" height="240" controls>
          <source src="${attach.name}" type="video/mp4">
          </video>
          <hr>
          `
        } 
        else{
          attachNode.innerHTML = `
          <p><b>File:&nbsp;</b>${attach.original_name}</p>
          <i  id="${attach.id}" class="fas fa-backspace text-danger btn btn-remove"></i>
          <h3><i>(docx, elxl, txt... are not avalable on site)</i></h3>
          <hr>
          `
        } 
        targetNode.appendChild(attachNode)
        
      });
      // load event when clicking btn remove 
      const items = this.elementRef.nativeElement.querySelectorAll('.btn-remove')
      if(items){
        items.forEach((item:any) => {
            item.style.cursor = 'pointer'
            item.addEventListener("click",(event:any)=>{
              const attachId = event.target.id
              this.removeItems.push(attachId) // remove item target
              event.target.parentElement.remove() //remove UI
          });
        });
      }
    })
    const formInputs = document.querySelectorAll('.new-item')
    const inputAdded = document.querySelectorAll('.new-item-add')
    //clear form
    inputAdded.forEach((item:any)=>{
      item.remove()
    })
    //clear input value form
    formInputs.forEach((item:any)=>{
      item.value = ''
    })
  }
  setComment(id:any){
    this.lecService.getLectureComments(id).subscribe(res=>{
      this.comments = res.cmts
    })
  }

  removeItemOnce(arr:any, value:any) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  getExtension(fileName:string){
    return fileName.split('.')[1]
  }

   clearArray(array:any) {
    while (array.length) {
      array.pop();
    }
  }

  deleteComment(cmtid:any,event:any){
    this.lecService.deleteComment(cmtid).subscribe(res=>{
      event.target.parentNode.style.opacity = '0.2'
      event.target.disabled = true
    })
  }

  closeCommentModal(){
    this.closeCmtModal.nativeElement.click()
  }
  

}
