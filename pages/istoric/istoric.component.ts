import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { Patient } from 'src/app/models/Patient';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { MedicalReportService } from 'src/app/services/medical-report.service';
import { MyPatientsService } from 'src/app/services/my-patients.service';

@Component({
  selector: 'app-istoric',
  templateUrl: './istoric.component.html',
  styleUrls: ['./istoric.component.css']
})
export class IstoricComponent {
  finishedAppointments: Appointment[] = [];
  patientId: string;
  patient: Patient;
  user: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
     private appointmentsService: AppointmentsService, private patientService: MyPatientsService, 
     private medicalReportService: MedicalReportService) {}
  ngOnInit() {
    this.patientId = this.activatedRoute.snapshot.paramMap.get('patientId');
    this.appointmentsService.getAppointmentsByPatientId(this.patientId).subscribe((appointments: Appointment[]) => {
      this.finishedAppointments = appointments.filter(app => app.state == "FINISHED");
    });
    this.patientService.getPatientById(this.patientId).subscribe((patient) => {
      this.patient = patient;
    });
  }
  onArrowClick(){
    this.router.navigate(['../history']);
  }

  onReportClick(appointment: Appointment): void{
    this.router.navigate(['../finished-report', appointment.id]);
  }

}
