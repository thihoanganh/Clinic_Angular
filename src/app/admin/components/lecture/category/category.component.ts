import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  loading = false
  cates = new Array<Category>()
  cateId!:any
  cateName!:any
  delMsg = ''
  newCateName!:any
  msg = ''
  notify!:any

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('closeCreateModal') closeCreateModal!: ElementRef;


  constructor(
    private lecService:LectureService
  ) { }

  ngOnInit(): void {
    this.getAllCates()
  }

  getAllCates(){
    this.lecService.getAllCates().subscribe(res=>this.cates = res.categories)
  }
  setModalData(cateid:any,cateName:any){
    this.cateId = cateid
    this.cateName = cateName
  }

  saveNewCateName(){
    this.lecService.renameCate(this.cateId,this.cateName).subscribe(res=>{
      this.msg = 'Create successfully !'
      this.notify = true
      this.getAllCates()
    })
    this.closeModal.nativeElement.click()
  }

  deleteCate(id:any,name:any,totalLec:any){
    if(confirm('IMPORTANT! Delete category will delete all belongs lecture and related data too! Are you sure to delete?')){
      this.lecService.deleteCate(id).subscribe(res=>{
        this.msg = `${name} was deleted. (${totalLec}) lectures was deleted too`
        this.notify = true
        this.getAllCates()
      })
    }
    
  }

  createCate(){
    this.loading = true
    this.lecService.createCate(this.newCateName).subscribe(res=>{
      this.msg = 'Create succesfully !'
      this.notify = true
      setTimeout(() => {
        this.getAllCates()
        this.loading = false
        this.closeCreateModal.nativeElement.click()
      }, 1000);
    })
  }

}
