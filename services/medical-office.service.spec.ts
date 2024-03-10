import { TestBed } from '@angular/core/testing';

import { MedicalOfficeService } from './medical-office.service';
import { MedicalOffice } from '../models/MedicalOffice';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { MyPatientsService } from './my-patients.service';

describe('MedicalOfficeService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let medicalOfficeService: MedicalOfficeService;

  beforeEach(() => {

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    medicalOfficeService = new MedicalOfficeService(httpClientSpy);
  });

  it('should be created', () => {
    expect(medicalOfficeService).toBeTruthy();
  });

  it('should retrieve medical office options', () => {
    // Arrange
    const mockMedicalOffices: MedicalOffice[] = [
      {
        id: '1',
        name: 'Medical Office 1',
        address: '123 Main Street',
        appointmentPrice: 50
      },
      {
        id: '2',
        name: 'Medical Office 2',
        address: '456 Elm Street',
        appointmentPrice: 75
      },
    ];
    
    httpClientSpy.get.and.returnValue(of(mockMedicalOffices));
  
    medicalOfficeService.getMedicalOfficesOptions().subscribe((medicalOffices) => {
      expect(medicalOffices).toEqual(mockMedicalOffices);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/medicaloffices`);
    });
  });

  it('should handle errors when retrieving medical office options', () => {
    const mockError = new Error('Failed to retrieve medical offices.');
    httpClientSpy.get.and.returnValue(throwError(mockError));
  
    medicalOfficeService.getMedicalOfficesOptions().subscribe(
      () => {
        fail('The observable should have thrown an error.');
      },
      (error) => {
        expect(error).toBe(mockError);
        expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/medicaloffices`);
      }
    );
  });
  
  
});
