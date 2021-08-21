import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserRouting } from './user.routing';
import { HomeComponent } from './component/home/home.component';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { ServiceComponent } from './component/services/service.component';
import { BlogListComponent } from './component/bloglist/bloglist.component';
import { BlogDetailComponent } from './component/blogdetail/blogdetail.component';
import { BusinessAppComponent } from './component/businessapp/business.component';
import { ContactUsComponent } from './component/contactus/contact.component';
import { EduccationAppComponent } from './component/educcationapp/educcation.component';
import { SeminarComponent } from './component/seminar/seminar.component';
import { SmnDetailComponent } from './component/smn-detail/smn-detail.component';
import { ScientificAppComponent } from './component/ScientificApp/scientificcomponent';
import { LibraryServiceApi } from '../services/Librarysreviceapi';
import { LibraryServiceMedicineApi } from '../services/Librarysreviceapimedicine';
import { DetailScientificComponent } from './component/DetailScientfic/detailscientificcomponent';
import { MedicineAppUserComponent } from './component/MedicineApp/medicinecomponent';
import { DetailMedicineComponent } from './component/DetailMedicine/detailmedicinecomponent';
import { MainLectureComponent } from './component/lecture/main-lecture/main-lecture.component';
import { DetailLectureComponent } from './component/lecture/detail-lecture/detail-lecture.component';
import { QuizPreparationComponent } from './component/lecture/quiz-preparation/quiz-preparation.component';
import { QuizExaminationComponent } from './component/lecture/quiz-examination/quiz-examination.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UserAuthGuard } from '../guards/user-auth-guard.service';
import { NgxPaginationModule } from 'ngx-pagination';

export function tokenGetter(){
  return localStorage.getItem('user-jwt')
}
@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    AboutUsComponent,
    ServiceComponent,
    BlogListComponent,
    BlogDetailComponent,
    BusinessAppComponent,
    ContactUsComponent,
    EduccationAppComponent,
    SeminarComponent,
    SmnDetailComponent,
    ScientificAppComponent,
    DetailScientificComponent,
    MedicineAppUserComponent,
    DetailMedicineComponent,
    MainLectureComponent,
    DetailLectureComponent,
    QuizPreparationComponent,
    QuizExaminationComponent,
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserRouting,
    JwtModule.forRoot({
      config:{
        tokenGetter:tokenGetter,
        allowedDomains:['localhost:5000'],
        disallowedRoutes:[]
      }
    }),
  ],
  providers: [
    LibraryServiceApi,
    LibraryServiceMedicineApi,
    UserAuthGuard
  ]
})

export class UserModule {

}