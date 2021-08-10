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
import { ManageComponent } from './components/seminar/manage/manage.component';
import { FeedbackComponent } from './components/seminar/feedback/feedback.component';
import { MailComponent } from './components/seminar/mail/mail.component';
import { SeminarService } from '../services/seminar.service';
import { CreateComponent } from './components/seminar/create/create.component';
import { CKEditorModule } from 'ng2-ckeditor-12';
import { EmailComponent } from './components/seminar/email/email.component';



export function tokenGetter(){
  return localStorage.getItem('admin-jwt')
}

@NgModule({
  declarations: [
    AdminComponent,
    StaffComponent,
    UserComponent,
    ManageComponent,
    FeedbackComponent,
    MailComponent,
    CreateComponent,
    EmailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CKEditorModule,
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
    DatePipe,
    SeminarService
  ]
})

export class AdminModule {

}