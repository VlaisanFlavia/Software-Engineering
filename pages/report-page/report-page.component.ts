import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { Medicine } from 'src/app/models/Medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { MedicalReportDto } from 'src/app/models/MedicalReportDto';
import { PrescriptionDto } from 'src/app/models/PrescriptionDto';
import { MedicalReportService } from 'src/app/services/medical-report.service';
import { Prescription } from 'src/app/models/Prescription';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.css']
})
export class ReportPageComponent {
  currentDate = new Date();
  reactiveForm: FormGroup;
  appointment: Appointment
  medicineOptions: Medicine[]

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private activationRouter: ActivatedRoute, private appointmentService: AppointmentsService, 
    private medicineService: MedicineService, private medicalReportService: MedicalReportService) {}

  ngOnInit() {
    this.createForm();
    const appointmentId = this.activationRouter.snapshot.paramMap.get('appointment');
    this.appointmentService.getAppointmentById(appointmentId).subscribe((appointment: Appointment) => {
      this.appointment = appointment;
      this.medicineService.getMedicineOptions().subscribe((medicineOptions: Medicine[]) => {
        this.medicineOptions = medicineOptions;  
      });
    });
  }
  
  createForm() {
    this.reactiveForm = this.formBuilder.group({
      patientName: '',
      appointmentDate: '',
      observation: '',
      fields: this.formBuilder.array([this.newMedicine()])
    });
  }

  fields(): FormArray {
    return this.reactiveForm.get('fields') as FormArray;
  }

  newMedicine(): FormGroup {
    return this.formBuilder.group({
      medicine: '',
      description: '',
    });
  }

  addField(): void {
    this.fields().push(this.newMedicine());
  }

  removeField(index: number): void {
    this.fields().removeAt(index);
  }

  validateAllFields(): void {
    for (let i = 0; i < this.fields().length; i++) {
      let medicine = this.fields().controls[i].get('medicine').value;
      if (medicine == null || medicine == '') {
        this.fields().controls[i].setErrors({ 'requiredMedicine': true });
      }
    }
  }

  isValidField(index: number): boolean {
    return this.fields().controls[index].valid;
  }

  onSubmit(): void {
    this.validateAllFields();
    for (let i = 0; i < this.fields().length; i++) {
      if (!this.isValidField(i)) {
        return;
      }
    }
    const recipe: PrescriptionDto[] = this.reactiveForm.get('fields').value.map((prescription: Prescription) => {
      return {
        medicineId: prescription.medicine.id,
        description: prescription.description
      }
    });
    const observation: string = this.reactiveForm.get('observation').value;
    const medicalReportDto: MedicalReportDto = this.mapToMedicalReportDto(observation, recipe); 
    console.log(medicalReportDto);
    this.medicalReportService.createMedicalReport(medicalReportDto).subscribe(() => {
      this.router.navigate(['../appointments']);
    });
  }

  mapToMedicalReportDto(observation: string, recipe: PrescriptionDto[]) : MedicalReportDto {
    const medicalReportDto : MedicalReportDto = {
      appointmentId: this.appointment.id,
      description: observation,
      recipe: recipe
    }
    return medicalReportDto;
  }
}
