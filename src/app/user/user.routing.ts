import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from '../guards/user-auth-guard.service';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { BlogDetailComponent } from './component/blogdetail/blogdetail.component';
import { BlogListComponent } from './component/bloglist/bloglist.component';
import { BusinessAppComponent } from './component/businessapp/business.component';
import { ContactUsComponent } from './component/contactus/contact.component';
import { EduccationAppComponent } from './component/educcationapp/educcation.component';
import { HomeComponent } from './component/home/home.component';
import { DetailLectureComponent } from './component/lecture/detail-lecture/detail-lecture.component';
import { MainLectureComponent } from './component/lecture/main-lecture/main-lecture.component';
import { QuizExaminationComponent } from './component/lecture/quiz-examination/quiz-examination.component';
import { QuizPreparationComponent } from './component/lecture/quiz-preparation/quiz-preparation.component';
import { SeminarComponent } from './component/seminar/seminar.component';
import { ServiceComponent } from './component/services/service.component';
import { SmnDetailComponent } from './component/smn-detail/smn-detail.component';


import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'aboutus', component: AboutUsComponent },
            { path: 'service', component: ServiceComponent },
            { path: 'bloglist', component: BlogListComponent },
            { path: 'blogdetail', component: BlogDetailComponent },
            { path: 'education', component: EduccationAppComponent },
            { path: 'business', component: BusinessAppComponent },
            { path: 'contactus', component: ContactUsComponent },
            { path: 'seminar', component: SeminarComponent },
            { path: 'seminar/details/:id', component:SmnDetailComponent },

            { path: 'lecture', component:MainLectureComponent },
            { path: 'lecture/learn/:id', component:DetailLectureComponent },
            { path: 'quiz/preparation/:id', component:QuizPreparationComponent, canActivate:[UserAuthGuard]},
            { path: 'quiz/exam/:userid/:quizid', component:QuizExaminationComponent, canActivate:[UserAuthGuard]},




            


        ]
    }
];

export const UserRouting = RouterModule.forRoot(routes);