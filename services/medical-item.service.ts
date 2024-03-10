import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicalItem } from '../models/MedicalItem';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MedicalItemDto } from '../models/MedicalItemDto';

@Injectable({
  providedIn: 'root'
})
export class MedicalItemService {

  constructor(private http: HttpClient) { }

  addMedicalItem(medicalItem: MedicalItem, medicalOfficeId: string): Observable<void> {
    const medicalItemDtos: MedicalItemDto[] = [ 
    {
      medicineId: medicalItem.medicine.id,
      medicalOfficeId: medicalOfficeId,
      quantity: medicalItem.quantity
    } 
  ];
    
    return this.http.post<void>(`${environment.apiUrl}/api/v1/items`, medicalItemDtos);
  }

}
