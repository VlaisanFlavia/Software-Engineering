import { FinishedReportComponent } from './finished-report.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { convertToParamMap, ParamMap } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { MedicalReportService } from 'src/app/services/medical-report.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { MedicalReport } from 'src/app/models/MedicalReport';


describe('FinishedReportComponent', () => {
  let component: FinishedReportComponent;
  let fixture: ComponentFixture<FinishedReportComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let mockRouter: Router;
  let mockMedicalReportService: MedicalReportService;
  let mockPdfGeneratorService: PdfGeneratorService;
  const dummyDate: Date = new Date("2019-01-16");
  const mockMedicalReport: MedicalReport = {
    id: "dummyId",
    appointment: {
      id: "dummyAppointmentId",
      date: dummyDate,
      state: "dummyState",
      patient: {
        id: "dummyIdPatient",
        firstName: "firstName",
        lastName: "lastName",
        cnp: "cnp",
        email: "email"
      },
      medicalOffice: {
        id: "idMedicalOffice",
        name: "name",
        address: "adress",
        appointmentPrice: 100
      }
    },
    description: "dummyDescription",
    recipe: [{
      medicine: {
        id: "idMedicine",
        name: "nameMedicine",
        providerCompanyName: "provider",
        price: 120
      },
      description: "description"
    }]
  };

  beforeEach(async () => {
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockMedicalReportService = jasmine.createSpyObj('MedicalReportService', ['getMedicalReportByAppointmentId']);
    mockPdfGeneratorService = jasmine.createSpyObj('PdfGeneratorService', ['downloadFinishedReportPDF']);

    await TestBed.configureTestingModule({
      declarations: [FinishedReportComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MedicalReportService, useValue: mockMedicalReportService },
        { provide: PdfGeneratorService, useValue: mockPdfGeneratorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FinishedReportComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch medical report on initialization', () => {

    const appointmentId = 'dummyAppointmentId';
    component.medicalReport = mockMedicalReport;

    const mockSnapshot = {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue(appointmentId)
      }
    };

    (mockActivatedRoute.snapshot as any) = mockSnapshot;
    (mockMedicalReportService.getMedicalReportByAppointmentId as jasmine.Spy).and.returnValue(of(mockMedicalReport));

    component.ngOnInit();

    expect(mockSnapshot.paramMap.get).toHaveBeenCalledWith('appointmentId');
    expect(mockMedicalReportService.getMedicalReportByAppointmentId).toHaveBeenCalledWith(appointmentId);
    expect(component.medicalReport).toEqual(mockMedicalReport);
  });


  it('should download the finished report PDF', () => {

    component.medicalReport = mockMedicalReport;

    component.onSubmit();

    expect(mockPdfGeneratorService.downloadFinishedReportPDF).toHaveBeenCalledWith(mockMedicalReport.id);
  });
  it('should fetch medical report on initialization', () => {

    const appointmentId = 'dummyAppointmentId';
    component.medicalReport = mockMedicalReport;
  
    const mockSnapshot = {
      paramMap: jasmine.createSpyObj('ParamMap', ['get']),
    };
    mockSnapshot.paramMap.get.and.returnValue(appointmentId);
  
    (mockActivatedRoute.snapshot as any) = mockSnapshot;
    (mockMedicalReportService.getMedicalReportByAppointmentId as jasmine.Spy).and.returnValue(of(mockMedicalReport));
  
    component.ngOnInit();
  
    expect(mockSnapshot.paramMap.get).toHaveBeenCalledWith('appointmentId');
    expect(mockMedicalReportService.getMedicalReportByAppointmentId).toHaveBeenCalledWith(appointmentId);
    expect(component.medicalReport).toEqual(mockMedicalReport);
  });
  
  it('should render the patient name', () => {

    const appointmentId = 'dummyAppointmentId';

  
    const mockSnapshot = {
      paramMap: jasmine.createSpyObj('ParamMap', ['get']),
    };
    mockSnapshot.paramMap.get.and.returnValue(appointmentId);
  
    (mockActivatedRoute.snapshot as any) = mockSnapshot;
    (mockMedicalReportService.getMedicalReportByAppointmentId as jasmine.Spy).and.returnValue(of(mockMedicalReport));
    component.medicalReport = mockMedicalReport;
    component.ngOnInit();
    fixture.detectChanges();
  
    const patientNameElement = fixture.nativeElement.querySelector('#patientName');
    expect(patientNameElement.value).toContain(mockMedicalReport.appointment.patient.firstName);
    expect(patientNameElement.value).toContain(mockMedicalReport.appointment.patient.lastName);
  });
  it('should render the appointment date', () => {
    const appointmentId = 'dummyAppointmentId';
    const mockSnapshot = {
      paramMap: jasmine.createSpyObj('ParamMap', ['get']),
    };
    mockSnapshot.paramMap.get.and.returnValue(appointmentId);
    (mockActivatedRoute.snapshot as any) = mockSnapshot;
    (mockMedicalReportService.getMedicalReportByAppointmentId as jasmine.Spy).and.returnValue(of(mockMedicalReport));
    component.medicalReport = mockMedicalReport;
    component.ngOnInit();
    fixture.detectChanges();
    const appointmentDateElement = fixture.nativeElement.querySelector('#appointmentDate');
    expect(appointmentDateElement.value).toBe(dummyDate.toLocaleDateString('en-US', { dateStyle: 'medium' }));
  });
  it('should render the medical report description', () => {
    const appointmentId = 'dummyAppointmentId';
    const mockSnapshot = {
      paramMap: jasmine.createSpyObj('ParamMap', ['get']),
    };
    mockSnapshot.paramMap.get.and.returnValue(appointmentId);
    (mockActivatedRoute.snapshot as any) = mockSnapshot;
    (mockMedicalReportService.getMedicalReportByAppointmentId as jasmine.Spy).and.returnValue(of(mockMedicalReport));
    component.medicalReport = mockMedicalReport;
    component.ngOnInit();
    fixture.detectChanges();
  
    const observationElement = fixture.nativeElement.querySelector('#observation');
    expect(observationElement.value).toBe(mockMedicalReport.description);
  });

});

