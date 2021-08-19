import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { AdminComponent } from './admin.component';
import { AddMedicineAppComponent } from './components/addmedicinemana/addmedicineapp.component';
import { BrandComponent } from './components/brand/brand.component';
import { MecineTypeComponent } from './components/mecinetype/mecinetype.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { MedicineDetailComponent } from './components/medicinedetail/medicinedetail.component';
import { MedicineAppComponent } from './components/medicinemana/medicineapp.component';
import { MedicineTypeComponent } from './components/medicinetype/medicinetype.component';
import { OriginComponent } from './components/origin/origin.component';
import { PriceAllComponent } from './components/priceall/price.component';
import { ScientificComponent } from './components/scientific/scientific.component';
import { ScientificDetailComponent } from './components/scientificdetail/scientificdetail.component';
import { CreateComponent } from './components/seminar/create/create.component';
import { EmailComponent } from './components/seminar/email/email.component';
import { FeedbackDetailComponent } from './components/seminar/feedback-detail/feedback-detail.component';
import { FeedbackComponent } from './components/seminar/feedback/feedback.component';
import { MailComponent } from './components/seminar/mail/mail.component';
import { ManageComponent } from './components/seminar/manage/manage.component';
import { SmnRegisteredComponent } from './components/seminar/smn-registered/smn-registered.component';
import { StaffComponent } from './components/staff/staff.component';
import { UpdateMedicineAppComponent } from './components/updatemedicinemana/updatemedicineapp.component';
import { UpdateScientificComponent } from './components/updatescientific/updatescientific.component';
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
         {path:'scientific',component:ScientificComponent},
         {path:'scientificdetail',component:ScientificDetailComponent},
         {path:'updatescientific',component:UpdateScientificComponent},
         {path:'medicineapp',component:MedicineAppComponent},
         {path:'medicinedetail',component:MedicineDetailComponent},
         {path:'addmedicineapp',component:AddMedicineAppComponent},
         {path:'updatemedicineapp',component:UpdateMedicineAppComponent},
         {path:'brand',component:BrandComponent},
         {path:'origin',component:OriginComponent},
         {path:'updatepricemedicine',component:MedicineComponent},
         {path:'seminar/registered/:id',component:SmnRegisteredComponent},
         {path:'seminar/feedback/details/:id',component:FeedbackDetailComponent},
         {path:'medicinetype',component:MedicineTypeComponent},
         {path:'mecinetype',component:MecineTypeComponent},
         {path:'priceall',component:PriceAllComponent},


        ]
    }
];

export const AdminRouting = RouterModule.forRoot(routes);