import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggedGuard } from './guards/logged-guard.service';
import { AdminLoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { LibraryServiceApi } from './services/Librarysreviceapi';
import { LibraryServiceMedicineApi } from './services/Librarysreviceapimedicine';
=======
import { QuizService } from './services/quiz.service';
>>>>>>> 5f2f0199d13d3297ebb75101dbdfe9aec94480e9


@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    AdminModule,
    BrowserAnimationsModule
   
  ],
  providers: [
    LoginService,
    RegisterService,
<<<<<<< HEAD
    LoggedGuard,

    LibraryServiceApi,
    LibraryServiceMedicineApi
=======
    QuizService,
    LoggedGuard
>>>>>>> 5f2f0199d13d3297ebb75101dbdfe9aec94480e9
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
