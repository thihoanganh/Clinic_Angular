import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class LectureCreateComponent implements OnInit {
  cates!:any
  loading!:any
  constructor(
    private lecService:LectureService,
    private jwtHeler:JwtHelperService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllCates()
  }
  newLecture(newLecForm:any){
    this.loading = true
    const decode = this.jwtHeler.decodeToken(localStorage.getItem('admin-jwt')!)
    const staffId = decode.Id
    this.lecService.createLecture(newLecForm.value,staffId).subscribe(res=>{
      this.router.navigate(['/admin/lecture'])
      this.loading = false
    })
  }

  getAllCates(){
    this.lecService.getAllCates().subscribe(res=>this.cates = res.categories)
  }
}
