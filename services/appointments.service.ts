import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../models/Appointment';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  getFutureAppointments(medicalOfficeId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/api/v1/appointments/offices/${medicalOfficeId}/waiting`);
  }

  deleteAppointment(appointmentId: string): Observable<void> { 
    return this.http.delete<void>(`${environment.apiUrl}/api/v1/appointments/${appointmentId}`);
  }

  getAppointmentById(appointmentId: string): Observable<Appointment> {
    return this.http.get<Appointment>(`${environment.apiUrl}/api/v1/appointments/${appointmentId}`);
  } 

  getAppointmentsByPatientId(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/api/v1/appointments/patients/${patientId}`)
  }
}
