import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedicalItem } from '../models/MedicalItem';
import { Observable, of } from 'rxjs';
import { DrugsTableService } from './drugs-table.service';
import { environment } from 'src/environments/environment.development';

describe('DrugsTableService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let drugsTableService: DrugsTableService;
  let service: DrugsTableService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrugsTableService]
    });
    service = TestBed.inject(DrugsTableService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    drugsTableService = new DrugsTableService(httpClientSpy);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(drugsTableService).toBeTruthy();
  });

  it('should retrieve drug table rows', () => {
    const medicalOfficeId = '123';
    const expectedRows: MedicalItem[] = [{
      medicine: {
        id: 'medicineId1',
        name: 'Medicine 1',
        providerCompanyName: 'Provider Company 1',
        price: 9.99
      },
      quantity: 10,
    }];
  
    httpClientSpy.get.and.returnValue(of(expectedRows));
  
    drugsTableService.getDrugTableRows(medicalOfficeId).subscribe(rows => {
      expect(rows).toEqual(expectedRows);
      expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment.apiUrl}/api/v1/items/${medicalOfficeId}`);
    });
  });
  
  

  it('should subtract a row', () => {
    const medicalOfficeId = '123';
    const drugTableRow = {
      medicine: {
        id: 'medicineId1',
        name: 'Medicine 1',
        providerCompanyName: 'Provider Company 1',
        price: 9.99
      },
      quantity: 10,
    };

    const expectedResponse = {};

    service.subtractRow(drugTableRow, medicalOfficeId).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/v1/items`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      medicineId: drugTableRow.medicine.id,
      medicalOfficeId: medicalOfficeId,
      quantity: 1
    });

    req.flush(expectedResponse);
  });
  

  it('should delete a row', () => {
    const medicalOfficeId = '123';
    const drugTableRow = {
      medicine: {
        id: 'medicineId1',
        name: 'Medicine 1',
        providerCompanyName: 'Provider Company 1',
        price: 9.99
      },
      quantity: 10,
    };

    const expectedResponse = {}; 

    service.deleteRow(drugTableRow, medicalOfficeId).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/api/v1/items`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual({
      medicineId: drugTableRow.medicine.id,
      medicalOfficeId: medicalOfficeId
    });

    req.flush(expectedResponse);
  });
  
});
