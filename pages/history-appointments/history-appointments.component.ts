import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { AccountService } from 'src/app/services/account.service';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-history-appointments',
  templateUrl: './history-appointments.component.html',
  styleUrls: ['./history-appointments.component.css']
})
export class HistoryAppointmentsComponent {
  finishedAppointments: Appointment[] = []
  constructor(private router: Router, private appointmentsService: AppointmentsService, private accountService: AccountService) {}

  ngOnInit() {
    this.appointmentsService.getAppointmentsByPatientId(this.accountService.userId).subscribe((appointments: Appointment[]) => {
      this.finishedAppointments = appointments.filter(app => app.state == "FINISHED");
    });
  }

  onReportClick(appointmentId: string): void{
    this.router.navigate(['finished-report', appointmentId]);
  }
}
