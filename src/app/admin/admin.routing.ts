import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { AdminComponent } from './admin.component';
import { InventoryMedicineComponent } from './components/medicine/inventorymedicine.component';
import { MedicineComponent } from './components/medicine/medicine.component';
import { WarehouseMedicineComponent } from './components/medicine/warehousemedicine.component';
import { InventoryScientificEquipmentComponent } from './components/scientificequipment/inventoryscientificequipment.component';
import { ScientificeqipmentComponent } from './components/scientificequipment/scientificequipment.component';
import { WarehouseScientificEquipmentComponent } from './components/scientificequipment/warehousescientificequipment.component';
import { CreateComponent } from './components/seminar/create/create.component';
import { EmailComponent } from './components/seminar/email/email.component';
import { FeedbackComponent } from './components/seminar/feedback/feedback.component';
import { MailComponent } from './components/seminar/mail/mail.component';
import { ManageComponent } from './components/seminar/manage/manage.component';
import { SmnRegisteredComponent } from './components/seminar/smn-registered/smn-registered.component';
import { StaffComponent } from './components/staff/staff.component';
import { StatisticalCustomerComponent } from './components/statistical/customer.component';
import { StatisticalMedicineComponent } from './components/statistical/medicine.component';
import { StatisticalScientificEquipmentComponent } from './components/statistical/scientificequipment.component';
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
         {path:'updatepricescientificequipment',component:ScientificeqipmentComponent},
         {path:'seminar/registered/:id',component:SmnRegisteredComponent},
         {path:'warehousemedicine',component:WarehouseMedicineComponent},
         {path:'warehousescientificequipment',component:WarehouseScientificEquipmentComponent},
         {path:'inventorymedicine',component:InventoryScientificEquipmentComponent},
         {path:'inventoryscientificequipment',component:InventoryMedicineComponent},
         {path:'statisticalsoldmedicine',component:StatisticalMedicineComponent},
         {path:'statisticalsoldscientificequipment',component:StatisticalScientificEquipmentComponent},
         {path:'statisticalcustomer',component:StatisticalCustomerComponent}

         

        ]
    }
];

export const AdminRouting = RouterModule.forRoot(routes);