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
<<<<<<< HEAD
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
=======
>>>>>>> 5f2f0199d13d3297ebb75101dbdfe9aec94480e9

import { ScientificEquipmentService } from '../services/scientificequipment.service';
import { Scientificequipment } from '../models/scientificequipment.model';
import { ScientificeqipmentComponent } from './components/scientificequipment/scientificequipment.component';
import { WarehouseScientificEquipmentComponent } from './components/scientificequipment/warehousescientificequipment.component';
import { WarehouseMedicineComponent } from './components/medicine/warehousemedicine.component';
import { InventoryMedicineComponent } from './components/medicine/inventorymedicine.component';
import { InventoryScientificEquipmentComponent } from './components/scientificequipment/inventoryscientificequipment.component';
import { StatisticalCustomerComponent } from './components/statistical/customer.component';
import { StatisticalMedicineComponent } from './components/statistical/medicine.component';
import { ReceiptMedicineService } from '../services/receipmedicineservice.service';
import { ReceiptScientificEquipmentService } from '../services/receiptscientificequipment.service';
import { PriceProductService } from '../services/priceproduct.service';
import { StatisticalService } from '../services/statistical.service';
import { StatisticalScientificEquipmentComponent } from './components/statistical/scientificequipment.component';

import { FeedbackDetailComponent } from './components/seminar/feedback-detail/feedback-detail.component';
import { ManageLectureComponent } from './components/lecture/manage/manage.component';
import { LectureService } from '../services/lecture.service';
import { CategoryComponent } from './components/lecture/category/category.component';
import { LectureCreateComponent } from './components/lecture/create/create.component';
import { QuizComponent } from './components/quiz/quiz/quiz.component';
import { CreateQuizComponent } from './components/quiz/create/create.component';
import { QuizUpdateComponent } from './components/quiz/update/update.component';


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
<<<<<<< HEAD
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
=======
    ScientificeqipmentComponent,
    WarehouseScientificEquipmentComponent,
    WarehouseMedicineComponent,
    InventoryMedicineComponent,
    InventoryScientificEquipmentComponent,
    StatisticalMedicineComponent,
    StatisticalCustomerComponent,
    StatisticalScientificEquipmentComponent,
    ManageLectureComponent,
    CategoryComponent,
    LectureCreateComponent,
    QuizComponent,
    CreateQuizComponent,
    QuizUpdateComponent
>>>>>>> 5f2f0199d13d3297ebb75101dbdfe9aec94480e9
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
<<<<<<< HEAD
    LibraryServiceApi,
    LibraryServiceMedicineApi
=======
    PriceProductService,
    ScientificEquipmentService,
    ReceiptMedicineService,
    ReceiptScientificEquipmentService,
    StatisticalService,
    LectureService
>>>>>>> 5f2f0199d13d3297ebb75101dbdfe9aec94480e9
  ]
})

export class AdminModule {

}