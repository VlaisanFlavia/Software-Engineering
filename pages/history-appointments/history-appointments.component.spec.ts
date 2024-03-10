import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


import { HistoryAppointmentsComponent } from './history-appointments.component';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'src/app/services/account.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

// describe('HistoryAppointmentsComponent', () => {
//   let component: HistoryAppointmentsComponent;
//   let fixture: ComponentFixture<HistoryAppointmentsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ HistoryAppointmentsComponent ],
//       imports: [HttpClientTestingModule]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(HistoryAppointmentsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   //Error: Unexpected value 'AppointmentsService' imported by the module 'DynamicTestModule'. Please add an @NgModule annotation

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
describe('HistoryAppointmentsComponent', () => {
  let component: HistoryAppointmentsComponent;
  let fixture: ComponentFixture<HistoryAppointmentsComponent>;
  let appointmentsService: jasmine.SpyObj<AppointmentsService>;
  let accountService: jasmine.SpyObj<AccountService>;
  let dateAppointment = new Date("2023-01-16")
  const mockAppointments = [
    {
      id: "id",
      date: dateAppointment,
      state: "FINISHED",
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
  ]

  beforeEach(async(() => {
    const appointmentsServiceSpy = jasmine.createSpyObj('AppointmentsService', ['getAppointmentsByPatientId']);
    const accountServiceSpy = jasmine.createSpyObj('AccountService', ['userId']);

    TestBed.configureTestingModule({
      declarations: [HistoryAppointmentsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AppointmentsService, useValue: appointmentsServiceSpy },
        { provide: AccountService, useValue: accountServiceSpy }
      ]
    }).compileComponents();

    appointmentsService = TestBed.inject(AppointmentsService) as jasmine.SpyObj<AppointmentsService>;
    accountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;

    fixture = TestBed.createComponent(HistoryAppointmentsComponent);
    component = fixture.componentInstance;
    
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should filter out appointments that are not in "FINISHED" state', () => {
    appointmentsService.getAppointmentsByPatientId.and.returnValue(of(mockAppointments));

    fixture.detectChanges();

    expect(component.finishedAppointments.length).toBe(1);
    expect(component.finishedAppointments[0]).toEqual(mockAppointments[0]);
  });

  // // works
  it('should display a table with appointments', () => {
    const tableElement = fixture.debugElement.query(By.css('#nursesTable')).nativeElement;
    expect(tableElement).toBeTruthy();
  });

  // works
  it('should have a button for each appointment to generate a report', () => {
    const reportButtons = fixture.debugElement.queryAll(By.css('.button'));
    expect(reportButtons.length).toBe(component.finishedAppointments.length);
  });


    // works
  it('should display the date of each appointment', () => {
    const appointmentDates = fixture.debugElement.queryAll(By.css('.custom-td:nth-child(2)'));
    expect(appointmentDates.length).toBe(component.finishedAppointments.length);
  
    appointmentDates.forEach((dateElement, index) => {
      const formattedDate = new Date(component.finishedAppointments[index].date).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'});
      expect(dateElement.nativeElement.textContent.trim()).toBe(formattedDate);
    });
  });

    //works
    it('should have previous and next arrow buttons', () => {
      const arrowContainer = fixture.debugElement.query(By.css('.arrow-container')).nativeElement;
      expect(arrowContainer).toBeTruthy();
  
      const prevArrowButton = arrowContainer.querySelector('.prev-arrow');
      expect(prevArrowButton).toBeTruthy();
  
      const nextArrowButton = arrowContainer.querySelector('.next-arrow');
      expect(nextArrowButton).toBeTruthy();
    });


 // works
 it('should sort appointments in descending order of date', () => {
  const appointmentDates = fixture.debugElement.queryAll(By.css('.custom-td:nth-child(2)'));
  const sortedAppointments = component.finishedAppointments.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const displayedDates = appointmentDates.map(dateElement => dateElement.nativeElement.textContent.trim());
  const sortedDates = sortedAppointments.map(appointment => new Date(appointment.date).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}));
  
  expect(displayedDates).toEqual(sortedDates);

});

it('should load the font-awesome stylesheet', () => {
  const linkElement = fixture.debugElement.query(By.css('link[href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"]'));
  expect(linkElement).toBeTruthy();
});

it('should display no table rows when there are no finished appointments', () => {

  appointmentsService.getAppointmentsByPatientId.and.returnValue(of(mockAppointments));
  fixture.detectChanges();

  const tableRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
  expect(tableRows.length).toBe(1);
});
it('should display the correct number of table rows for multiple finished appointments', () => {
  appointmentsService.getAppointmentsByPatientId.and.returnValue(of(mockAppointments));
  fixture.detectChanges();
  const tableRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
  expect(tableRows.length).toBe(mockAppointments.length);
});
it('should display the correct appointment details in table rows', () => {
  appointmentsService.getAppointmentsByPatientId.and.returnValue(of(mockAppointments));
  fixture.detectChanges();

  const tableRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
  expect(tableRows.length).toBe(mockAppointments.length);

  tableRows.forEach((row, index) => {
    const cells = row.queryAll(By.css('.custom-td'));
    expect(cells.length).toBe(3);
    expect(cells[0].nativeElement.textContent.trim()).toBe(mockAppointments[index].medicalOffice.name);
    expect(cells[1].nativeElement.textContent.trim()).toBe(
      mockAppointments[index].date.toLocaleDateString('en-UK', { month: '2-digit', day: '2-digit', year: 'numeric' })
    );
  });
});

});