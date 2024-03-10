import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule, ReactiveFormsModule ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the RegisterComponent', () => {
    expect(component).toBeTruthy();
  });
  it('should call onSubmit method when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });
  it('should set submitted to true when the form is submitted', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.submitted).toBe(true);
  });
  it('should not show validation errors when the form is submitted with valid data', () => {
    const form = component.form;
    form.get('name')?.setValue('John Doe');
    form.get('email')?.setValue('johndoe@example.com');
    form.get('password')?.setValue('password123');
    form.get('role')?.setValue('pacient');
    form.get('speciality')?.setValue('');
    form.get('medicalOfficeName')?.setValue('');
    form.get('medicalOfficeAddress')?.setValue('123 Main Street');
    fixture.detectChanges();
    const errorMessages = fixture.nativeElement.querySelectorAll('.invalid-feedback');
    expect(errorMessages.length).toEqual(0);
  });
  it('should enable submit button when the form is valid', () => {
    const form = component.form;
    form.get('name')?.setValue('John Doe');
    form.get('email')?.setValue('john.doe@example.com');
    form.get('password')?.setValue('password');
    form.get('role')?.setValue('Doctor');
    form.get('speciality')?.setValue('Cardiology');
    form.get('medicalOfficeName')?.setValue('Cardiology Associates');
    form.get('medicalOfficeAddress')?.setValue('123 Main St');
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(false);
  });

  it('should show validation errors for required fields when the form is submitted with empty data', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    const errorMessages = fixture.nativeElement.querySelectorAll('.invalid-feedback');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('should mark email field as invalid for invalid email', () => {
    const form = component.form;
    const emailField = form.get('email');
    emailField?.setValue('invalid-email');
    expect(emailField?.invalid).toBe(true);
  });
  
  it('should show validation error for future birth date', () => {
    const form = component.form;
    const birthDateField = form.get('birthDate');
    const futureDate = new Date().getTime() + 86400000; 
    birthDateField?.setValue(new Date(futureDate));
    expect(birthDateField?.invalid).toBe(true);
  });

  it('should show validation error for invalid CNP length', () => {
    const form = component.form;
    const cnpField = form.get('cnp');
    cnpField?.setValue('1234567890'); 
    expect(cnpField?.invalid).toBe(true);
  });
  
  it('should be valid when all fields are filled correctly', () => {
    const form = component.form;
    // Setează valorile corecte pentru toate câmpurile
    form.get('firstName')?.setValue('John');
    form.get('lastName')?.setValue('Doe');
    form.get('email')?.setValue('john.doe@example.com');
    form.get('cnp')?.setValue('1234567890123');
    form.get('birthDate')?.setValue(new Date('1990-01-01'));
    form.get('medicalOfficeAddress')?.setValue('123 Main Street');
    form.get('password')?.setValue('password123');
    form.get('confirmPassword')?.setValue('password123');
    form.get('role')?.setValue('ROLE_PATIENT');
    fixture.detectChanges();
    expect(form.valid).toBe(false);
  });

  // it('should update the cabinet list after calling getCabinet()', () => {
  //   spyOn(component['accountService'], 'getCabinets').and.returnValue(of(['Cabinet 1', 'Cabinet 2']));
  //   component.getCabinet();
  //   fixture.detectChanges();
  
  //   expect(component.cabinete.length).toEqual(2);
  //   expect(component.cabinete).toContain('Cabinet 1');
  //   expect(component.cabinete).toContain('Cabinet 2');
  // });
  
  
  it('should set the medicalOfficeName field when a cabinet is selected', () => {
    const mockEvent = { target: { value: 'Cabinet 1' } };
    component.changeCabinet(mockEvent);
    expect(component.form.controls['medicalOfficeName'].value).toEqual('Cabinet 1');
  });
  

  it('should validate specific fields for the "ROLE_DOCTOR" role', () => {
    const form = component.form;
    form.get('role')?.setValue('ROLE_DOCTOR');
    fixture.detectChanges();
    expect(form.get('speciality')?.valid).toBe(false);
    expect(form.get('medicalOfficeName')?.valid).toBe(false);
    expect(form.get('medicalOfficeAddress')?.valid).toBe(false);
  });
  
  
  it('should validate specific fields for the "ROLE_NURSE" role', () => {
    const form = component.form;
    form.get('role')?.setValue('ROLE_NURSE');
    fixture.detectChanges();
    expect(form.get('speciality')?.valid).toBe(true);
    expect(form.get('medicalOfficeName')?.valid).toBe(false);
    expect(form.get('medicalOfficeAddress')?.valid).toBe(true);
  });
  

});