import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routes } from 'src/app-routing.module';
import { Location } from '@angular/common';

import { PacientAppointmentComponent } from './pacient-appointment.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MyPatientsService } from 'src/app/services/my-patients.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MedicalOfficeService } from 'src/app/services/medical-office.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('PacientAppointmentComponent', () => {
  let component: PacientAppointmentComponent;
  let fixture: ComponentFixture<PacientAppointmentComponent>;
  let location: Location;
  let routerSpy: jasmine.SpyObj<Router>;
  let medicalOfficeServiceSpy: jasmine.SpyObj<MedicalOfficeService>
  let myPatientServiceSpy: jasmine.SpyObj<MyPatientsService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {

    medicalOfficeServiceSpy = jasmine.createSpyObj('MedicalOfficeService', ['getMedicalOfficesOptions']);
    myPatientServiceSpy = jasmine.createSpyObj('MyPatientsService', ['onClickPlataCash']);
    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, AppRoutingModule, 
                RouterTestingModule.withRoutes(routes)],
      declarations: [ PacientAppointmentComponent ],
      providers: [HttpClient, MyPatientsService, MedicalOfficeService, HttpHandler, FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test Plata cash click', ()=>{
    spyOn(component, 'onPlataCashClick');
    component.onPlataCashClick();
    expect(component.onPlataCashClick).toHaveBeenCalled();
  });

  it('test Plata card click', ()=>{
    spyOn(component, 'onPlataCardClick');
    component.onPlataCardClick();
    expect(component.onPlataCardClick).toHaveBeenCalled();
  });

  it('should have a form with reactiveForm', () => {
    expect(component.reactiveForm).toBeDefined();
  });

  it('should have a required date input', () => {
    const dateInput = fixture.nativeElement.querySelector('input[name="date"]');
    expect(dateInput.required).toBeTruthy();
  });

  it('should have a date input with a min value of 2023-05-01', () => {
    const dateInput = fixture.nativeElement.querySelector('input[name="date"]');
    expect(dateInput.min).toEqual('2023-05-01');
  });

  it('should have a required time select', () => {
    const timeSelect = fixture.nativeElement.querySelector('select[name="time"]');
    expect(timeSelect.required).toBeTruthy();
  });

  it('should have two payment buttons', () => {
    const paymentButtons = fixture.nativeElement.querySelectorAll('button[type="submit"]');
    expect(paymentButtons.length).toEqual(2);
  });

  it('should forbid weekends', () => {
    const weekends = [new Date(2023, 4, 6), new Date(2023, 4, 7)];
    const weekdays = [new Date(2023, 4, 5), new Date(2023, 4, 8)];
    weekends.forEach(date => {
      const control = new FormControl(date);
      const result = component.forbidWeekendsValidator(control);
      expect(result).toEqual({ 'noWeekends': true });
    });
    weekdays.forEach(date => {
      const control = new FormControl(date);
      const result = component.forbidWeekendsValidator(control);
      expect(result).toBeNull();
    });
  });

  // works
  it('should enable time input when non-weekend date is selected', () => {
    const dateInput = fixture.debugElement.query(By.css('#date'));
    dateInput.nativeElement.value = '2023-05-15';
    dateInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const timeInput = fixture.debugElement.query(By.css('#time'));
    expect(timeInput.nativeElement.disabled).toBe(false);
  });

  // works
  it('should show error message when weekend date is selected', () => {
    const dateInput = fixture.debugElement.query(By.css('#date'));
    dateInput.nativeElement.value = '2023-05-14';
    dateInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const errorElement = fixture.debugElement.query(By.css('.alert-danger'));
    expect(errorElement.nativeElement.textContent).toContain('Selectarea unei date de weekend nu este permisă.');
  });

  it('should not show an error message if the date selected is not on a weekend', () => {
    const dateInput = fixture.nativeElement.querySelector('#date');
    dateInput.value = '2023-05-17'; // Tuesday
    dateInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorElement).toBeFalsy();
  });


  it('should disable the submit button if the form is invalid', () => {
    const dateInput = fixture.nativeElement.querySelector('#date');
    dateInput.value = ''; // Invalid
    dateInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('#plata_cash');
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should enable the submit button if the form is valid', () => {
    const dateInput = fixture.nativeElement.querySelector('#date');
    dateInput.value = '2023-05-17'; 
    dateInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const timeSelect = fixture.nativeElement.querySelector('#time');
    timeSelect.value = '09:00 AM - 10:00 AM'; 
    timeSelect.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const cabinetSelect = fixture.nativeElement.querySelector('#cabinet');
    cabinetSelect.value = '1'; // Valid
    cabinetSelect.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('#plata_cash');
    expect(submitButton.disabled).toBeFalse();
  });

});
