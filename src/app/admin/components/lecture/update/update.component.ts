import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class LectureUpdateComponent implements OnInit {
  lecId!:any
  lecture!:any
  cates!:any
  cateSelection!:any
  constructor(
    private route:ActivatedRoute,
    private lecService:LectureService,
    private jwtHelper:JwtHelperService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.lecId = this.route.snapshot.params.id
    
    this.lecService.getLetureById(this.lecId).subscribe(res=>{
      this.lecture = res.result[0]
      this.getAllCates()
    })
    
 }
  getAllCates(){
    this.lecService.getAllCates().subscribe(res=>{
      this.cates = res.categories
      this.cateSelection = this.cates.find((c:any)=>c.id == this.lecture.cateid).id
    })
  }

  updateLecture(updateForm:any){
    const token = localStorage.getItem('admin-jwt')
    const decode = this.jwtHelper.decodeToken(token!)
      this.lecture.cateid = updateForm.value.cateid
      this.lecture.modifyby = decode.Username
      this.lecService.updateLecture(this.lecture).subscribe(res=>{
          updateForm.reset()
          this.router.navigate(['/admin/lecture'])
      })
  }

 

}
