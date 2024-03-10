import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MedicalReportDto } from '../models/MedicalReportDto';
import { MedicalReport } from '../models/MedicalReport';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {
  constructor(private http: HttpClient) { }
  createMedicalReport(medicalReportDto: MedicalReportDto) : Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/api/v1/reports`, medicalReportDto);
  }

  getMedicalReportByAppointmentId(appointmentId: string) : Observable<MedicalReport> {
    return this.http.get<MedicalReport>(`${environment.apiUrl}/api/v1/reports/appointments/${appointmentId}`);
  }
}
