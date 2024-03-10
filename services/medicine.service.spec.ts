import { TestBed } from '@angular/core/testing';

import { MedicineService } from './medicine.service';
import { HttpClient } from '@angular/common/http';
import { Medicine } from '../models/Medicine';
import { of } from 'rxjs';

describe('MedicineService', () => {
  
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let medicineService: MedicineService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    medicineService = new MedicineService(httpClientSpy);
  });

  it('should be created', () => {
    expect(medicineService).toBeTruthy();
  });

  it('it should contain expected medicine (Http Client called once)', (done : DoneFn) => {
    const expectedMedicine: Medicine[] = [{
        id: "idMedicineMock",
        name: "medicineNameMock",
        providerCompanyName: "providerCompanyNameMock",
        price: 200
    }];
    httpClientSpy.get.and.returnValue(of(expectedMedicine));
    medicineService.getMedicineOptions().subscribe({
      next: medicineOption => {
        expect(medicineOption)
        .withContext('expected medicine found')
        .toEqual(expectedMedicine);
        done();
      },
      error: done.fail
    });
    expect(httpClientSpy.get.calls.count())
    .withContext('one call')
    .toBe(1);
  });

});
