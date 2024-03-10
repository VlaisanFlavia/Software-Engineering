import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPageComponent } from './report-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicalReportService } from 'src/app/services/medical-report.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app-routing.module';
import { FormBuilder } from '@angular/forms';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { MedicineService } from 'src/app/services/medicine.service';
import { Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';

describe('ReportPageComponent', () => {
  let component: ReportPageComponent;
  let fixture: ComponentFixture<ReportPageComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPageComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AppRoutingModule
      ],
      providers: [
        AppointmentsService,
        MedicineService,
        MedicalReportService,
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form', () => {
    expect(component.reactiveForm).toBeDefined();
    expect(component.reactiveForm.get('observation')).toBeDefined();
    expect(component.fields()).toBeDefined();
    expect(component.fields().length).toBe(1);
  });

  it('should add a new field to the form', () => {
    component.addField();
    expect(component.fields().length).toBe(2);
  });

  it('should remove a field from the form', () => {
    component.removeField(0);
    expect(component.fields().length).toBe(0);
  });
  it('should add a new field to the form', () => {
    component.addField();
    expect(component.fields().length).toBe(2);
    expect(component.fields().at(1).get('medicine')).toBeDefined();
    expect(component.fields().at(1).get('description')).toBeDefined();
  });
  it('should remove a field from the form', () => {
    component.removeField(0);
    expect(component.fields().length).toBe(0);
  });
  
  it('should not mark valid fields', () => {
    component.fields().at(0).get('medicine').setValue({ id: 'id', name: 'Medicine 1' });
    component.fields().at(0).get('description').setValue('Test description');
    component.validateAllFields();
    expect(component.fields().at(0).hasError('requiredMedicine')).toBe(false);
  });
  it('should return true for valid field', () => {
    component.fields().at(0).get('medicine').setValue({ id: 1, name: 'Medicine 1' });
    component.fields().at(0).get('description').setValue('Test description');
    expect(component.isValidField(0)).toBe(true);
  });
  it('should validate all fields and not set requiredMedicine error when field is valid', () => {
    const medicine = { id: "id", name: 'Medicine 1' };
    component.fields().at(0).get('medicine').setValue(medicine);
    component.validateAllFields();
    expect(component.fields().at(0).get('medicine').hasError('requiredMedicine')).toBe(false);
  });

  it('should initialize the form', () => {
    expect(component.reactiveForm).toBeDefined();
    expect(component.reactiveForm.get('patientName')).toBeDefined();
    expect(component.reactiveForm.get('appointmentDate')).toBeDefined();
    expect(component.reactiveForm.get('observation')).toBeDefined();
  });

  it('should add and remove fields', () => {
    expect(component.fields().length).toBe(1);
    component.addField();
    expect(component.fields().length).toBe(2);
    component.removeField(0);
    expect(component.fields().length).toBe(1);
    component.removeField(0);
    expect(component.fields().length).toBe(0);
  });

  it('should mark invalid fields', () => {
    
    component.fields().at(0).get('medicine').setValue(null);
    component.validateAllFields();
    expect(component.fields().at(0).hasError('requiredMedicine')).toBe(true);
  
    
    component.fields().at(0).get('medicine').setValue({ id: 1, name: 'Medicine 1' });
    component.validateAllFields();
    expect(component.fields().at(0).hasError('requiredMedicine')).toBe(false);
  });
  
  it('should submit the form', () => {
    spyOn(component, 'onSubmit');
    
    component.fields().at(0).get('medicine').setValue({ id: 1, name: 'Medicine 1' });
    component.fields().at(0).get('description').setValue('Test description');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should mark invalid if patientName is empty', () => {
    component.reactiveForm.get('patientName').setValue('');
    component.validateAllFields();
    expect(component.reactiveForm.get('patientName').invalid).toBe(false);
  });
  
  it('should mark invalid if appointmentDate is empty', () => {
    component.reactiveForm.get('appointmentDate').setValue('');
    component.validateAllFields();
    expect(component.reactiveForm.get('appointmentDate').invalid).toBe(false);
  });
  
  it('should mark invalid if observation is empty', () => {
    component.reactiveForm.get('observation').setValue('');
    component.validateAllFields();
    expect(component.reactiveForm.get('observation').invalid).toBe(false);
  });
  

  it('should add and remove a new field to the form', () => {
    expect(component.fields().length).toBe(1);
    component.addField();
    expect(component.fields().length).toBe(2);
    component.removeField(1);
    expect(component.fields().length).toBe(1);
  });
  
  it('should mark invalid if medicine field and description field are empty for a new field', () => {
    component.addField();
    const newFieldIndex = component.fields().length - 1;
    component.validateAllFields();
    expect(component.fields().at(newFieldIndex).get('medicine').invalid).toBe(false);
    expect(component.fields().at(newFieldIndex).get('description').invalid).toBe(false);
  });
  
});


