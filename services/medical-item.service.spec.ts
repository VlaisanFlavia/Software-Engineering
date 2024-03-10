import { TestBed } from '@angular/core/testing';

import { MedicalItemService } from './medical-item.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedicalItem } from '../models/MedicalItem';
import { MedicalItemDto } from '../models/MedicalItemDto';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

describe('MedicalItemService', () => {
  let service: MedicalItemService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedicalItemService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MedicalItemService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 

  describe('addMedicalItem', () => {
    it('should send a POST request to the correct endpoint with the correct data', () => {
      const medicalItem: MedicalItem = {
        medicine: { id: "id", name: 'Medicine 1', providerCompanyName: "pcnMock", price: 100 },
        quantity: 10,
      };
      const medicalOfficeId = '1';

      service.addMedicalItem(medicalItem, medicalOfficeId).subscribe();

      const expectedDto: MedicalItemDto[] = [
        {
          medicineId: medicalItem.medicine.id,
          medicalOfficeId: medicalOfficeId,
          quantity: medicalItem.quantity,
        },
      ];

      const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/items`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(expectedDto);
    });

    it('should return an Observable<void>', () => {
      const medicalItem: MedicalItem = {
        medicine: { id: "id", name: 'Medicine 1', providerCompanyName: "pcnMock", price: 100 },
        quantity: 10,
      };
      const medicalOfficeId = '1';

      const result$ = service.addMedicalItem(medicalItem, medicalOfficeId);

      expect(result$).toBeTruthy();
      expect(result$ instanceof Observable).toBeTrue();
    });
  });

  it('should handle error response', () => {
    const medicalItem: MedicalItem = {
      medicine: {
        id: "id",
        name: 'Medicine 1',
        providerCompanyName: "pcnMock",
        price: 100
      },
      quantity: 10
    };
    
    const medicalOfficeId = '1';

    service.addMedicalItem(medicalItem, medicalOfficeId).subscribe({
      error: (error) => {
        expect(error).toBeDefined();
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/items`);
    expect(req.request.method).toEqual('POST');

    const errorResponse = new ErrorEvent('Internal Server Error', {
      message: 'Something went wrong',
    });
    req.error(errorResponse);
  });
  it('should initialize correctly', () => {
    expect(service).toBeDefined();
  });  
});

// describe('updateMedicalItem', () => {
//   it('should send a PUT request to the correct endpoint with the updated medical item data', () => {
//     const updatedMedicalItem: MedicalItem = {
//       medicine: { id: "id", name: 'Updated Medicine', providerCompanyName: "pcnMock", price: 200 },
//       quantity: 20,
//     };

//     service.updateMedicalItem(updatedMedicalItem).subscribe();

//     const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/items/${updatedMedicalItem.medicine.id}`);
//     expect(req.request.method).toEqual('PUT');
//     expect(req.request.body).toEqual(updatedMedicalItem);
//   });

//   it('should handle error response', () => {
//     const updatedMedicalItem: MedicalItem = {
//       medicine: { id: "id", name: 'Updated Medicine', providerCompanyName: "pcnMock", price: 200 },
//       quantity: 20,
//     };

//     service.updateMedicalItem(updatedMedicalItem).subscribe({
//       error: (error) => {
//         expect(error).toBeDefined();
//         // Add further assertions if needed
//       }
//     });

//     const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/items/${updatedMedicalItem.medicine.id}`);
//     expect(req.request.method).toEqual('PUT');

//     // Simulate an error response
//     const errorResponse = new ErrorEvent('Internal Server Error', {
//       message: 'Something went wrong',
//     });
//     req.error(errorResponse);
//   });
// });


