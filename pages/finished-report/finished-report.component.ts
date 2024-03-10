import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalReport } from 'src/app/models/MedicalReport';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { MedicalReportService } from 'src/app/services/medical-report.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-finished-report',
  templateUrl: './finished-report.component.html',
  styleUrls: ['./finished-report.component.css']
})
export class FinishedReportComponent {
  medicalReport: MedicalReport;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
       private medicalReportService: MedicalReportService,
      private pdfService: PdfGeneratorService) { }

  ngOnInit(): void {
    let appointmentId = this.activatedRoute.snapshot.paramMap.get('appointmentId');
    this.medicalReportService.getMedicalReportByAppointmentId(appointmentId).subscribe((medicalReport) => {
      this.medicalReport = medicalReport;
    });
  }

  onSubmit(): void {
    this.pdfService.downloadFinishedReportPDF(this.medicalReport.id);
  }
}
