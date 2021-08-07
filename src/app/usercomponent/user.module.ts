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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserRouting
  ],
  providers: [
  ]
})

export class UserModule {

}