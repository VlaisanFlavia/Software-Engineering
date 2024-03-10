import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentDto } from 'src/app/models/AppointmentDto';

import { MedicalOffice } from 'src/app/models/MedicalOffice';
import { AccountService } from 'src/app/services/account.service';
import { MedicalOfficeService } from 'src/app/services/medical-office.service';
import { MyPatientsService } from 'src/app/services/my-patients.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-pacient-appointment',
  templateUrl: './pacient-appointment.component.html',
  styleUrls: ['./pacient-appointment.component.css']
})
export class PacientAppointmentComponent {

  medicalOfficesOptions: MedicalOffice[] = [];
  reactiveForm: FormGroup;
  selectedOffice: MedicalOffice;

  constructor(private route: Router, private medicalOfficeService: MedicalOfficeService, 
    private myPatientService: MyPatientsService, private formBuilder: FormBuilder, private accountService: AccountService) {

  }

  ngOnInit() {
    this.reactiveForm = this.formBuilder.group({
      date: new FormControl(null, [Validators.required, this.forbidWeekendsValidator]), 
      // adaugăm validatorul aici
      time: new FormControl(null, [Validators.required]),
      cabinet: new FormControl(null, [Validators.required]),
    })
    this.medicalOfficeService.getMedicalOfficesOptions().subscribe((options) => (this.medicalOfficesOptions = options));
  }

  forbidWeekendsValidator(control: FormControl): { [s: string]: boolean } {
    const date = new Date(control.value);
    if (date.getDay() === 6 || date.getDay() === 0) { // verificăm dacă data selectată este sâmbătă sau duminică
      return { 'noWeekends': true }; // returnăm obiectul care indică eroarea
    }
    return null; // data selectată este validă
  }

  onCompletingForm(): AppointmentDto {

    const appointmentDto: AppointmentDto = {
      date: '',
      patientId: '',
      medicalOfficeId: ''
    }

    var date: string;
    date = this.reactiveForm.get('date').value;

    var dateForDto: string;
    dateForDto = date;
    dateForDto = dateForDto.concat(' ');

    var time: string;
    time = this.reactiveForm.get('time').value;
    time = time.substring(0, 5);
    dateForDto = dateForDto.concat(time);

    appointmentDto.date = dateForDto;

    appointmentDto.patientId = this.accountService.userId;

    var medicalOffice: MedicalOffice;
    medicalOffice = this.reactiveForm.get('cabinet').value;

    appointmentDto.medicalOfficeId = medicalOffice.id;

    console.log(appointmentDto);

    return appointmentDto;

  }

  onPlataCashClick() {

    const appointmentDto: AppointmentDto = {
      date: this.onCompletingForm().date,
      patientId: this.onCompletingForm().patientId,
      medicalOfficeId: this.onCompletingForm().medicalOfficeId
    }
   
    this.myPatientService.onClickPlataCash(appointmentDto).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );

    this.route.navigate(['succes']);
  }

  onPlataCardClick() {

    const appointmentDto: AppointmentDto = {
      date: this.onCompletingForm().date,
      patientId: this.onCompletingForm().patientId,
      medicalOfficeId: this.onCompletingForm().medicalOfficeId
    }
    this.myPatientService.onClickPlataCard(appointmentDto).subscribe(
      (url: string) => window.open(url, "_blank")
    );

    this.route.navigate(['home']);
  }

  onSubmit(event) {
    console.log(event.submitter.id);

    if (event.submitter.id == "plata_cash") {
      this.onPlataCashClick();
    } else {
      this.onPlataCardClick();
    }
  }



}