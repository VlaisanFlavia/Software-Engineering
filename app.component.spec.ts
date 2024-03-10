import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FooterComponent } from './sharepage/footer/footer.component';
import { NursesComponent } from './pages/nurses/nurses.component';
import { DrugsTableComponent } from './pages/drugs-table/drugs-table.component';
import { ManagementComponent } from './pages/management/management.component';
import { HomeComponent } from './pages/home/home.component';
import { MyPatientsComponent } from './pages/my-patients/my-patients.component';
import { AddButtonComponent } from './pages/drugs-table/add-button/add-button.component';
import { PacientAppointmentComponent } from './pages/pacient-appointment/pacient-appointment.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ReportPageComponent } from './pages/report-page/report-page.component';
import { HistoryAppointmentsComponent } from './pages/history-appointments/history-appointments.component';
import { SuccesComponent } from './sharepage/succes/succes.component';


import { DrugsTableService } from "./services/drugs-table.service";
import { MyPatientsService } from "./services/my-patients.service";
import { MyNursesService } from "./services/my-nurses.service";
import { MedicineService } from "./services/medicine.service";
import { MedicalOfficeService } from "./services/medical-office.service";
import { ProfilePageService } from "./services/profile-page.service";
import { AppointmentsService } from "./services/appointments.service";
import { ImagesService } from "./services/images.service";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AlertComponent } from './alert/alert/alert.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, NavbarComponent,
        FooterComponent,
        NursesComponent, DrugsTableComponent,
        ManagementComponent, HomeComponent,
        MyPatientsComponent,
        AddButtonComponent,
        PacientAppointmentComponent,
        ProfilePageComponent,
        ReportPageComponent,
        HistoryAppointmentsComponent,
        SuccesComponent,
        AlertComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule],
      providers: [DrugsTableService, MyPatientsService, MyNursesService, MedicineService, MedicalOfficeService,
        ProfilePageService, MedicalOfficeService, AppointmentsService, ImagesService, HttpClient, HttpHandler,
        ]

    }).compileComponents();
  
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  

});

