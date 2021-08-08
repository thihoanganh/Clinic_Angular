import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { BlogDetailComponent } from './component/blogdetail/blogdetail.component';
import { BlogListComponent } from './component/bloglist/bloglist.component';
import { BusinessAppComponent } from './component/businessapp/business.component';
import { ContactUsComponent } from './component/contactus/contact.component';
import { EduccationAppComponent } from './component/educcationapp/educcation.component';
import { HomeComponent } from './component/home/home.component';

import { ServiceComponent } from './component/services/service.component';

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
            { path: 'contactus', component: ContactUsComponent }
        ]
    }
];

export const UserRouting = RouterModule.forRoot(routes);