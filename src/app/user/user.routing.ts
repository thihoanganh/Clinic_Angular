import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './component/aboutus/aboutus.component';
import { BlogDetailComponent } from './component/blogdetail/blogdetail.component';
import { BlogListComponent } from './component/bloglist/bloglist.component';
import { BusinessAppComponent } from './component/businessapp/business.component';
import { ContactUsComponent } from './component/contactus/contact.component';
import { DetailMedicineComponent } from './component/DetailMedicine/detailmedicinecomponent';
import { DetailScientificComponent } from './component/DetailScientfic/detailscientificcomponent';
import { EduccationAppComponent } from './component/educcationapp/educcation.component';
import { HomeComponent } from './component/home/home.component';
import { MedicineAppUserComponent } from './component/MedicineApp/medicinecomponent';
import { ScientificAppComponent } from './component/ScientificApp/scientificcomponent';
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
            { path: 'scientific', component: ScientificAppComponent },
            { path: 'scientificdetail', component: DetailScientificComponent },
            { path: 'medical', component: MedicineAppUserComponent },
            { path: 'medicinedetail', component: DetailMedicineComponent },
        ]
    }
];

export const UserRouting = RouterModule.forRoot(routes);