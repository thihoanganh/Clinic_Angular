import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  loading = false
  listUsers = new Array<User>()
  totalUsers!:any
  totalPage!:any
  page  = 1
  deleteSuccessNotify = false
  constructor(
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.getData(this.page)
  }

  getData(page:any){
    this.loading = true
    this.userService.getAll(page)
    .subscribe(
      res=>{
        this.totalPage = res.total_page
        this.page = page
        this.listUsers = res.users
        this.totalUsers = res.total_users
        this.loading = false
      }
    )
  }

  getDataByPage(pageInput:any){
   this.getData(pageInput.value.page)
  }

  deleteUser(id:any){
    if(confirm(`Are you sure to delete user ID:${id}`)) {
      this.userService.deleteUser(id)
      .subscribe(res=>{
        this.deleteSuccessNotify = true // flag alert 
        this.getData(this.page)
      })
    }
  
  }
}
