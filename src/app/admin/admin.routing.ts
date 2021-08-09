import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';

import { AdminComponent } from './admin.component';
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
        ]
    }
];

export const AdminRouting = RouterModule.forRoot(routes);