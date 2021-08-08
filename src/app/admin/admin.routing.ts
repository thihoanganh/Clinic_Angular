import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';



const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
          

        ]
    }
];

export const AdminRouting = RouterModule.forRoot(routes);