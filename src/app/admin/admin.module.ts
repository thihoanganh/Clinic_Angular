import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';


import { AdminComponent } from './admin.component';
import { AdminRouting } from './admin.routing';
import { AuthGuard } from '../guards/auth-guard.service';
import { StaffComponent } from './components/staff/staff.component';
import { UserComponent } from './components/user/user.component';
import { UserService } from '../services/user.service';
import { StaffService } from '../services/staff.service';
import { DatePipe } from '@angular/common';


export function tokenGetter(){
  return localStorage.getItem('admin-jwt')
}

@NgModule({
  declarations: [
    AdminComponent,
    StaffComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRouting,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:['localhost:5000'],
        disallowedRoutes:[]
      }
    }),
    
  ],
  providers: [
    AuthGuard,
    UserService,
    StaffService,
    DatePipe
  ]
})

export class AdminModule {

}