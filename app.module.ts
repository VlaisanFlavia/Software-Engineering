import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from 'src/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagementComponent } from './pages/management/management.component';
import { DrugsTableComponent } from './pages/drugs-table/drugs-table.component';
import { NursesComponent } from './pages/nurses/nurses.component';
import { MyPatientsComponent } from './pages/my-patients/my-patients.component';
import { IstoricComponent } from './pages/istoric/istoric.component';
import { ForgotPasswordComponent } from './pages/account/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/account/login/login.component';
import { ResetPasswordComponent } from './pages/account/reset-password/reset-password.component';
import { RegisterComponent } from './pages/account/register/register.component';
import { AlertComponent } from './alert/alert/alert.component';

import { FutureAppointmentsComponent } from './pages/future-appointments/future-appointments.component';
import { HistoryAppointmentsComponent } from './pages/history-appointments/history-appointments.component';
import { AddButtonComponent } from './pages/drugs-table/add-button/add-button.component';
import { PacientAppointmentComponent } from './pages/pacient-appointment/pacient-appointment.component';
import { SuccesComponent } from './sharepage/succes/succes.component';
import { FinishedReportComponent } from './pages/finished-report/finished-report.component';


import { MyPatientsService } from './services/my-patients.service';
import { MedicineService } from './services/medicine.service';
import { DrugsTableService } from './services/drugs-table.service';
import { MyNursesService } from './services/my-nurses.service';

import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';


import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterception } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ManagementComponent,
    DrugsTableComponent,
    NursesComponent,
    MyPatientsComponent,
    IstoricComponent,
    FutureAppointmentsComponent,
    HistoryAppointmentsComponent,
    AddButtonComponent,
    PacientAppointmentComponent,
    SuccesComponent,
    RegisterComponent,
    AlertComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
    FinishedReportComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MdbModalModule,
    NgbModalModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ManagementComponent,
    DrugsTableComponent,
    NursesComponent,
    MyPatientsComponent,
    IstoricComponent,
    FutureAppointmentsComponent,
    AddButtonComponent,
    MaterialModule,
    HistoryAppointmentsComponent,
    AddButtonComponent,
    PacientAppointmentComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
    RegisterComponent,
    AlertComponent
  ],
  providers: [
    MyPatientsService, MedicineService, DrugsTableService, MyNursesService, MdbModalService, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterception, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
