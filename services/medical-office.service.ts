import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalOffice } from '../models/MedicalOffice';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MedicalOfficeService {

  constructor(private http: HttpClient) { }

  getMedicalOfficesOptions(): Observable<MedicalOffice[]>{
    return this.http.get<MedicalOffice[]>(`${environment.apiUrl}/api/v1/medicaloffices`);
  }
}
