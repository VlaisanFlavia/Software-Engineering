import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Patient } from '../models/Patient';
import { MedicalOffice } from '../models/MedicalOffice';
import { environment } from 'src/environments/environment.development';
import { AppointmentsService } from './appointments.service';
import { Appointment } from '../models/Appointment';
import { of } from 'rxjs';

describe('AppointmentsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AppointmentsService;
  const mockEnvironment = {
    apiUrl: 'mock-api-url'
  };

  beforeEach(() => {  
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'delete']);
    service = new AppointmentsService(httpClientSpy);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: environment, useValue: mockEnvironment }
      ]
    });
  });
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve future appointments', () => {
    const medicalOfficeId = '123';
    const mockPatient: Patient = {
      id: 'patientId1',
      firstName: 'John',
      lastName: 'Doe',
      cnp: '123456789',
      email: 'john.doe@example.com'
    };
    
    const mockMedicalOffice: MedicalOffice = {
      id: 'medicalOfficeId1',
      name: 'Medical Office 1',
      address: '123 Main Street',
      appointmentPrice: 50
    };
    
    const mockAppointments: Appointment[] = [
      {
        id: 'appointmentId1',
        date: new Date(),
        state: 'Scheduled',
        patient: mockPatient,
        medicalOffice: mockMedicalOffice
      },
      {
        id: 'appointmentId2',
        date: new Date(),
        state: 'Completed',
        patient: mockPatient,
        medicalOffice: mockMedicalOffice
      },
    ];
    httpClientSpy.get.and.returnValue(of(mockAppointments));
  
    service.getFutureAppointments(medicalOfficeId).subscribe(appointments => {
      expect(appointments).toEqual(mockAppointments);
    });
  
    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/appointments/offices/${medicalOfficeId}/waiting`);
  });

  it('should delete an appointment', () => {
    const appointmentId = '456';
  
    httpClientSpy.delete.and.returnValue(of());
  
    service.deleteAppointment(appointmentId).subscribe(() => {
      expect(httpClientSpy.delete).toHaveBeenCalledWith(
        `${environment.apiUrl}/api/v1/appointments/${appointmentId}`
      );
    });
  
    expect(httpClientSpy.delete).toHaveBeenCalled();
  });

  it('should retrieve an appointment by ID', () => {
    const appointmentId = '789';

    const mockPatient: Patient = {
      id: '456',
      firstName: 'John',
      lastName: 'Doe',
      cnp: '123456789',
      email: 'john.doe@example.com'
    };

    const mockMedicalOffice: MedicalOffice = {
      id: '789',
      name: 'Medical Office 1',
      address: '123 Main Street',
      appointmentPrice: 50
    };
    
    const mockAppointment: Appointment = {
      id: '123',
      date: new Date(),
      state: 'Scheduled',
      patient: mockPatient,
      medicalOffice: mockMedicalOffice
    };
  
    httpClientSpy.get.and.returnValue(of(mockAppointment));
  
    service.getAppointmentById(appointmentId).subscribe(appointment => {
      expect(appointment).toEqual(mockAppointment);
    });
  
    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/appointments/${appointmentId}`);
  });

  it('should retrieve appointments by patient ID', () => {
    const patientId = 'abc';
    const mockPatient: Patient = {
      id: 'patientId1',
      firstName: 'John',
      lastName: 'Doe',
      cnp: '123456789',
      email: 'john.doe@example.com'
    };
    
    const mockMedicalOffice: MedicalOffice = {
      id: 'medicalOfficeId1',
      name: 'Medical Office 1',
      address: '123 Main Street',
      appointmentPrice: 50
    };
    
    const mockAppointments: Appointment[] = [
      {
        id: 'appointmentId1',
        date: new Date(),
        state: 'Scheduled',
        patient: mockPatient,
        medicalOffice: mockMedicalOffice
      },
      {
        id: 'appointmentId2',
        date: new Date(),
        state: 'Completed',
        patient: mockPatient,
        medicalOffice: mockMedicalOffice
      },
    ];
  
    httpClientSpy.get.and.returnValue(of(mockAppointments));
  
    service.getAppointmentsByPatientId(patientId).subscribe(appointments => {
      expect(appointments).toEqual(mockAppointments);
    });
  
    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/appointments/patients/${patientId}`);
  });
});
