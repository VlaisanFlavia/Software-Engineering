import { NgModule } from "@angular/core";
 
import { RouterModule, Routes } from '@angular/router';

import { ManagementComponent } from './app/pages/management/management.component';
import { HomeComponent } from './app/pages/home/home.component';
import { DrugsTableComponent } from './app/pages/drugs-table/drugs-table.component';
import { NursesComponent } from "./app/pages/nurses/nurses.component";
import { MyPatientsComponent } from "./app/pages/my-patients/my-patients.component";
import { IstoricComponent } from "./app/pages/istoric/istoric.component";
import { FutureAppointmentsComponent } from "./app/pages/future-appointments/future-appointments.component";
import { HistoryAppointmentsComponent } from "./app/pages/history-appointments/history-appointments.component";
import { AddButtonComponent } from "./app/pages/drugs-table/add-button/add-button.component";
import { ReportPageComponent } from "./app/pages/report-page/report-page.component";
import { FinishedReportComponent } from "./app/pages/finished-report/finished-report.component";

import { PacientAppointmentComponent } from "./app/pages/pacient-appointment/pacient-appointment.component";
import { ProfilePageComponent } from "./app/pages/profile-page/profile-page.component";
import { SuccesComponent } from "./app/sharepage/succes/succes.component";
import { LoginComponent } from "./app/pages/account/login/login.component";
import { RegisterComponent } from "./app/pages/account/register/register.component";
import { ForgotPasswordComponent } from "./app/pages/account/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./app/pages/account/reset-password/reset-password.component";
import { AuthGuard } from "./app/guards/auth.guard";


export const routes: Routes=[ 
    {path:'', component:HomeComponent, pathMatch: 'full'},
    {path:'home', component:HomeComponent},
    {path:'history/:patientId', component:IstoricComponent},
    {path:'management', component:ManagementComponent},
    {path:'drugs-table', component:DrugsTableComponent},
    {path:'nurses', component:NursesComponent},
    {path:'my-patients', component:MyPatientsComponent},
    {path:'appointments', component:FutureAppointmentsComponent},
    {path:'history-appointments', component:HistoryAppointmentsComponent},
    {path:'pacient-appointment', component:PacientAppointmentComponent},
    {path: 'report-page/:appointment', component: ReportPageComponent},
    {path: 'profile-page', component: ProfilePageComponent}, 
    {path: 'succes', component: SuccesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgotPassword', component: ForgotPasswordComponent},
    {path: 'resetPassword', component: ResetPasswordComponent},
    {path: 'finished-report/:appointmentId', component: FinishedReportComponent}
]


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],

    exports: [
        RouterModule 
    ]

})

export class AppRoutingModule{}

export const routingComponents = [HomeComponent, ManagementComponent, DrugsTableComponent, NursesComponent, MyPatientsComponent, IstoricComponent, PacientAppointmentComponent, ReportPageComponent, ProfilePageComponent]