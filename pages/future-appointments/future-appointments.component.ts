import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-future-appointments',
  templateUrl: './future-appointments.component.html',
  styleUrls: ['./future-appointments.component.css']
})
export class FutureAppointmentsComponent {
  appointments: Appointment[] = [];

  constructor(private router: Router, private appointmentsService: AppointmentsService, 
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.appointmentsService.getFutureAppointments(this.accountService.medicalOfficeId).subscribe(appointments => this.appointments = appointments);
  }

  onCompleteClick(appointmentId: string){
    this.router.navigate(['../report-page', appointmentId]);
  }

  onClickDeleteAppointment(appointment: Appointment): void {
    this.appointmentsService.deleteAppointment(appointment.id).subscribe(() => {
      this.appointments = this.appointments.filter(a => a.id !== appointment.id);
    });
  }

}
