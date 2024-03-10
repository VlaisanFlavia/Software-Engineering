import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

import { MyPatientsService } from './my-patients.service';
import { Patient } from '../models/Patient';
import { AppointmentDto } from '../models/AppointmentDto';

describe('MyPatientsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let myPatientsService: MyPatientsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    myPatientsService = new MyPatientsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(myPatientsService).toBeTruthy();
  });

  it('should retrieve patients rows from the server', () => {
    const expectedPatients: Patient[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        cnp: '1234567890',
        email: 'johndoe@example.com'
      }
    ];

    httpClientSpy.get.and.returnValue(of(expectedPatients));

    myPatientsService.getMyPatientsRows('medicalOfficeId').subscribe(patients => {
      expect(patients).toEqual(expectedPatients);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/patients/offices/medicalOfficeId`);
  });

  it('should retrieve a patient by ID from the server', () => {
    const expectedPatient: Patient = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      cnp: '1234567890',
      email: 'johndoe@example.com'
    };

    httpClientSpy.get.and.returnValue(of(expectedPatient));

    myPatientsService.getPatientById('patientId').subscribe(patient => {
      expect(patient).toEqual(expectedPatient);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/patients/patientId`);
  });

  it('should send a payment request with PlataCash', () => {
    const appointmentDto: AppointmentDto = {
      date: '2023-05-16',
      patientId: '1',
      medicalOfficeId: 'ABC123'
    };

    httpClientSpy.post.and.returnValue(of({}));

    myPatientsService.onClickPlataCash(appointmentDto).subscribe(response => {
      expect(response).toBeTruthy();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/v1/appointments`,
      appointmentDto
    );
  });

  it('should send a payment request with PlataCard', () => {
    const appointmentDto: AppointmentDto = {
      date: '2023-05-16',
      patientId: '1',
      medicalOfficeId: 'ABC123'
    };

    httpClientSpy.post.and.returnValue(of({}));

    myPatientsService.onClickPlataCard(appointmentDto).subscribe(response => {
      expect(response).toBeTruthy();
    });

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      `${environment.apiUrl}/api/v1/payments`,
      appointmentDto,
      { responseType: 'text' as 'json' }
    );
  });
});
