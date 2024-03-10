import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { IstoricComponent } from './istoric.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import {routes } from 'src/app-routing.module'
import { AppComponent } from 'src/app/app.component';
import { MyPatientsComponent } from '../my-patients/my-patients.component';
import { NavbarComponent } from 'src/app/sharepage/navbar/navbar.component';
import { FooterComponent } from 'src/app/sharepage/footer/footer.component';
import { DrugsTableComponent } from '../drugs-table/drugs-table.component';
import { NursesComponent } from '../nurses/nurses.component';
import { HomeComponent } from '../home/home.component';
import { ManagementComponent } from '../management/management.component';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IstoricComponent', () => {
  let component: IstoricComponent;
  let fixture: ComponentFixture<IstoricComponent>;
  let appointmentsService: AppointmentsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstoricComponent,
        MyPatientsComponent,
        AppComponent, NavbarComponent,
        FooterComponent,IstoricComponent,
        NursesComponent, DrugsTableComponent,
        ManagementComponent, HomeComponent ],
      imports: [AppRoutingModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
        ],
      providers: [AppointmentsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IstoricComponent);
    component = fixture.componentInstance;
    appointmentsService = TestBed.inject(AppointmentsService); 
  
    component.patient = {
      id: "mockId",
      firstName: "mockFirstName",
      lastName: "mockLastName",
      cnp: "mockCNP",
      email: "mockEmail"
    };

    let dateAppointment = new Date("2023-01-16")
    component.finishedAppointments = [
      {
        id: "id",
        date: dateAppointment,
        state: "state",
        patient: {
          id: "id",
          firstName: "firstN",
          lastName: "lastN",
          cnp: "cnp",
          email: "email"
        },
        medicalOffice: {
          id: "id",
          name: "name",
          address: "adress",
          appointmentPrice: 100
        }
      }
    ];
    
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   // works
   it('should create container element', () => {
    const fixture = TestBed.createComponent(IstoricComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.container')).toBeTruthy();
  });

// works
it('should create navigation arrows', () => {
  const fixture = TestBed.createComponent(IstoricComponent);
  fixture.detectChanges();
  const compiled = fixture.nativeElement;
  expect(compiled.querySelector('.prev-arrow')).toBeTruthy();
  expect(compiled.querySelector('.next-arrow')).toBeTruthy();
});


// works
  it('should navigate to previous appointment on arrow click', () => {
    const fixture = TestBed.createComponent(IstoricComponent);
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(component, 'onArrowClick');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const prevArrow = compiled.querySelector('.prev-arrow');
    prevArrow.click();
    expect(navigateSpy).toHaveBeenCalled();
  });

 
  // works
  it('should display the patient name if user exists', () => {
    component.patient = {
      id: "mockId",
      firstName: "John",
      lastName: "Doe",
      cnp: "mockCNP",
      email: "mockEmail"
    };
    component.user = true;
    fixture.detectChanges();
    const titleEl: HTMLElement = fixture.debugElement.query(By.css('.titlu')).nativeElement;
    expect(titleEl.textContent).toContain('Istoricul pacientului John Doe');
  });


});
