import { TestBed } from '@angular/core/testing';

import { MedicalReportService } from './medical-report.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routes } from 'src/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportPageComponent } from '../pages/report-page/report-page.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { MedicalReportDto } from '../models/MedicalReportDto';

describe('MedicalReportService', () => {
  let service: MedicalReportService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ReportPageComponent ],
      providers: [MedicalReportService]
    });
    service = TestBed.inject(MedicalReportService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createMedicalReport', () => {
    it('should send a POST request to the correct API endpoint', () => {
      const medicalReportDto: MedicalReportDto = {
        appointmentId: '12345',
        description: 'This is a medical report description',
        recipe: [
          { medicineId: '67890', description: 'Take medicine A twice a day' },
          { medicineId: '54321', description: 'Apply ointment B on affected area' }
        ]
      };
      

      service.createMedicalReport(medicalReportDto).subscribe();

      const req = httpTestingController.expectOne(`${environment.apiUrl}/api/v1/reports`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(medicalReportDto);

      req.flush(null);
    });
  });
});
