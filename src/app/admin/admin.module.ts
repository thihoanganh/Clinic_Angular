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
import { MedicineComponent } from './components/medicine/medicine.component';
import { MedicineService } from '../services/medicine.service';
import { SmnRegisteredComponent } from './components/seminar/smn-registered/smn-registered.component';
import { FeedbackDetailComponent } from './components/seminar/feedback-detail/feedback-detail.component';
import { ScientificComponent } from './components/scientific/scientific.component';
import { UpdateScientificComponent } from './components/updatescientific/updatescientific.component';
import { MedicineDetailComponent } from './components/medicinedetail/medicinedetail.component';
import { AddMedicineAppComponent } from './components/addmedicinemana/addmedicineapp.component';
import { UpdateMedicineAppComponent } from './components/updatemedicinemana/updatemedicineapp.component';
import { BrandComponent } from './components/brand/brand.component';
import { OriginComponent } from './components/origin/origin.component';
import { MedicineAppComponent } from './components/medicinemana/medicineapp.component';
import { LibraryServiceMedicineApi } from '../services/Librarysreviceapimedicine';
import { LibraryServiceApi } from '../services/Librarysreviceapi';
import { MedicineTypeComponent } from './components/medicinetype/medicinetype.component';
import { MecineTypeComponent } from './components/mecinetype/mecinetype.component';
import { PriceAllComponent } from './components/priceall/price.component';



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
    EmailComponent,
    SmnRegisteredComponent,
    FeedbackDetailComponent,
    MedicineComponent,
    SmnRegisteredComponent,
    ScientificComponent,
    UpdateScientificComponent,
    MedicineAppComponent,
    MedicineDetailComponent,
    AddMedicineAppComponent,
    UpdateMedicineAppComponent,
    BrandComponent,
    OriginComponent,
    SmnRegisteredComponent,
    FeedbackDetailComponent,
    MedicineComponent,
    SmnRegisteredComponent,
    MedicineTypeComponent,
    MecineTypeComponent,
    PriceAllComponent
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
    SeminarService,
    MedicineService,
    LibraryServiceApi,
    LibraryServiceMedicineApi
  ]
})

export class AdminModule {

}