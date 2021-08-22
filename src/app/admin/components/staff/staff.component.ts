import { DatePipe } from '@angular/common';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Position } from 'src/app/models/position.model';
import { Staff } from 'src/app/models/staff.model';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  listStaffs = new Array<Staff>()
  loading = false
  deleteSuccessNotify = false
  totalPage!:any
  totalStaffs!:any
  page = 1
  addStaffFailureNotify = false
  addStaffSuccessNotify = false
  usernameExist = false
  positions = new Array<Position>()
  staff!:Staff
  createStaffNotifySuccess = false
  createStaffNotifyFailure = false
  enableAddStaff = true
  aaa = [1,2,3]
  @ViewChild('closeNewStaffModal') closeNewStaffModal!: ElementRef;
  constructor(
    private staffService:StaffService,
    private datePipe:DatePipe,
    private jwtHelper:JwtHelperService
  ){}

  ngOnInit(): void {
    // get staffs data
    this.getData(this.page) 
    // get positions
    this.staffService.getAllPosition()
    .subscribe(res=>this.positions = res.positions) 
    // enable/disable add staff feature
    const token = localStorage.getItem('admin-jwt')
      if(token && !this.jwtHelper.isTokenExpired(token)){
        var decodeToken = this.jwtHelper.decodeToken(token)
        this.enableAddStaff = decodeToken.IsAdmin == 'true' ? true : false
      }



  }

  getData(page:any){
    this.loading = true
    this.staffService.getAll(this.page)
    .subscribe(
      res=>{
        this.listStaffs = res.staffs
        this.totalPage = res.total_page
        this.totalStaffs = res.total_staffs
        this.listStaffs.forEach(staff => {
            staff.dob = this.datePipe.transform(staff.dob,'yyyy/MM/dd')
            staff.wokingStart = this.datePipe.transform(staff.wokingStart,'yyyy/MM/dd')
            this.loading = false
        });
      }
    )
  }

  deleteStaff(id:any){
   if(confirm(`Are you sure to delete staff ID:${id} ?`)){
      this.staffService.deleteStaff(id)
      .subscribe(
        res=>{
          this.deleteSuccessNotify = true
          this.getData(this.page)
        }
      )
   }
   
  }

  getDataByPage(page:any){
    this.getData(page)
  }

  addStaff(newStaffForm:any){
    this.loading = true
    this.staffService.checkStaffExist(newStaffForm.value.username)
    .subscribe(
      res=>{
        if(res.exist){
          // username already exist
          this.usernameExist = true // flag to show notify in view
        }else{
          this.usernameExist = false
          //create staff
          this.staff = newStaffForm.value
          this.staffService.createStaff(this.staff)
          .subscribe(
            res=>{
              if(res.staff_id){
                //create success
                this.createStaffNotifySuccess = true //flag notify
                this.createStaffNotifyFailure = false //flag notify
                this.closeNewStaffModal.nativeElement.click() // close current form
                this.getData(this.page) // reload data
                this.loading = false
              }else{
                this.createStaffNotifyFailure =true
                this.loading = false
              }
            }
          )
          this.loading = false
        }
      }
    )
  }
}
