import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Patient } from '../models/Patient';
import { environment } from 'src/environments/environment.development';
import { AppointmentDto } from '../models/AppointmentDto';

@Injectable({
  providedIn: 'root'
})
export class MyPatientsService {

  constructor(private http: HttpClient) { }

  getMyPatientsRows(medicalOfficeId: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${environment.apiUrl}/api/v1/patients/offices/${medicalOfficeId}`);
  }

  getPatientById(patientId: string): Observable<Patient>{
    return this.http.get<Patient>(`${environment.apiUrl}/api/v1/patients/${patientId}`);
  }

  onClickPlataCash(appointmentDto: AppointmentDto): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/v1/appointments`, appointmentDto);
  }

  onClickPlataCard(appointmentDto: AppointmentDto): Observable<any>{

    console.log("sunt aici");
      return this.http.post(`${environment.apiUrl}/api/v1/payments`, appointmentDto, {responseType: 'text'});
  
  }
  

}
