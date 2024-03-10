import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, of } from 'rxjs';
import { MedicalItem } from '../models/MedicalItem';
import { MedicalItemDto } from 'src/app/models/MedicalItemDto';

@Injectable({
  providedIn: 'root'
})
export class DrugsTableService {
  constructor(private http: HttpClient) { }

  getDrugTableRows(medicalOfficeId: string): Observable<MedicalItem[]> {
    return this.http.get<MedicalItem[]> (`${environment.apiUrl}/api/v1/items/${medicalOfficeId}`);
  }
  subtractRow(drugTableRow : MedicalItem, medicalOfficeId: string): Observable<any> {
    const drugTableRowDTO: MedicalItemDto = {
      medicineId: drugTableRow.medicine.id,
      medicalOfficeId: medicalOfficeId,
      quantity: 1
    }
    
    return this.http.put<any>(`${environment.apiUrl}/api/v1/items`, drugTableRowDTO);
  }
  deleteRow(drugTableRow : MedicalItem, medicalOfficeId: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), 
      body: {
        medicineId: drugTableRow.medicine.id,
        medicalOfficeId: medicalOfficeId
      }
    }
    return this.http.delete(`${environment.apiUrl}/api/v1/items`, options);
  }
}
