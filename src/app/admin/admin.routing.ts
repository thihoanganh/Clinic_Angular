import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { AdminComponent } from './admin.component';
import { CategoryComponent } from './components/lecture/category/category.component';
import { LectureCreateComponent } from './components/lecture/create/create.component';
import { ManageLectureComponent } from './components/lecture/manage/manage.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { CreateQuizComponent } from './components/quiz/create/create.component';
import { QuizComponent } from './components/quiz/quiz/quiz.component';
import { QuizUpdateComponent } from './components/quiz/update/update.component';
import { CreateComponent } from './components/seminar/create/create.component';
import { EmailComponent } from './components/seminar/email/email.component';
import { FeedbackDetailComponent } from './components/seminar/feedback-detail/feedback-detail.component';
import { FeedbackComponent } from './components/seminar/feedback/feedback.component';
import { MailComponent } from './components/seminar/mail/mail.component';
import { ManageComponent } from './components/seminar/manage/manage.component';
import { SmnRegisteredComponent } from './components/seminar/smn-registered/smn-registered.component';
import { StaffComponent } from './components/staff/staff.component';
import { UserComponent } from './components/user/user.component';



const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate:[AuthGuard],
        children: [
       //  {path:'',component:DashboardComponent},
         {path:'user',component:UserComponent},
         {path:'staff',component:StaffComponent},
         {path:'seminar/manage',component:ManageComponent},
         {path:'seminar/mail',component:MailComponent},
         {path:'seminar/feedback',component:FeedbackComponent},
         {path:'seminar/create',component:CreateComponent},
         {path:'seminar/email/:id',component:EmailComponent},
         {path:'updatepricemedicine',component:MedicineComponent},
         {path:'seminar/registered/:id',component:SmnRegisteredComponent},
         {path:'seminar/feedback/details/:id',component:FeedbackDetailComponent},

         {path:'lecture',component:ManageLectureComponent},
         {path:'lecture/create',component:LectureCreateComponent},
         {path:'lecture/category',component:CategoryComponent},

         {path:'lecture/quiz',component:QuizComponent},
         {path:'lecture/quiz/create',component:CreateQuizComponent},
         {path:'lecture/quiz/update/:id',component:QuizUpdateComponent},



         


        ]
    }
];

export const AdminRouting = RouterModule.forRoot(routes);