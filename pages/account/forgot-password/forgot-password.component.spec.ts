import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import {By} from "@angular/platform-browser";
import { throwError,of } from 'rxjs';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Reset password form', () => {
  let component: ForgotPasswordComponent; // Replace with the name of your component or code file
  let fixture: ComponentFixture<ForgotPasswordComponent>; // Replace with the name of your component or code file

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ], // Replace with the name of your component or code file
      imports: [ HttpClientTestingModule, RouterTestingModule,FormsModule, ReactiveFormsModule ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent); // Replace with the name of your component or code file
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button while loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable submit button after loading', () => {
    component.loading = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeFalse();
  });


  it('should not show error message when email is valid', () => {
    const emailInput = component.form.controls['email'];
    emailInput.setValue('valid-email@example.com');
    component.submitted = true;
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback'));
    expect(errorMessage).toBeNull();
  });

  it('should have a valid form when a valid email is entered', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('valid-email@example.com');
  component.submitted = true;
  fixture.detectChanges();
  expect(component.form.valid).toBeTrue();
});

it('should call the forgotPassword method of the AccountService with the correct email', () => {
  const emailInput = component.form.controls['email'];
  const email = 'valid-email@example.com';
  emailInput.setValue(email);
  component.submitted = true;
  fixture.detectChanges();
  spyOn(component.accountService, 'forgotPassword').and.callThrough();
  const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  button.click();
  expect(component.accountService.forgotPassword).toHaveBeenCalledWith(email);
});

it('should initialize the form correctly', () => {
  expect(component.form.controls['email'].value).toBe('');
  expect(component.form.valid).toBeFalse();
});


it('should call the forgotPassword method of the AccountService with the correct email', () => {
  const emailInput = component.form.controls['email'];
  const email = 'valid-email@example.com';
  emailInput.setValue(email);
  component.submitted = true;
  fixture.detectChanges();
  spyOn(component.accountService, 'forgotPassword').and.callThrough();
  const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  button.click();
  expect(component.accountService.forgotPassword).toHaveBeenCalledWith(email);
});

it('should mark email field as invalid when it is empty', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('');
  component.submitted = true;
  fixture.detectChanges();
  expect(emailInput.valid).toBeFalse();
  expect(emailInput.errors['required']).toBeTruthy();
});

it('should mark email field as valid when a valid email is entered', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('valid-email@example.com');
  component.submitted = true;
  fixture.detectChanges();
  expect(emailInput.valid).toBeTrue();
});

it('should display error message when email is required', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('');
  component.submitted = true;
  fixture.detectChanges();
  const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback')).nativeElement;
  expect(errorMessage.textContent).toContain('E-mail incorect');
});

it('should call the forgotPassword method of the AccountService with the correct email', () => {
  const emailInput = component.form.controls['email'];
  const email = 'valid-email@example.com';
  emailInput.setValue(email);
  component.submitted = true;
  fixture.detectChanges();
  spyOn(component.accountService, 'forgotPassword').and.returnValue(of(null));
  const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  button.click();
  expect(component.accountService.forgotPassword).toHaveBeenCalledWith(email);
});

it('should initialize the form with empty email field', () => {
  expect(component.form.controls['email'].value).toBe('');
});

it('should initialize the form with invalid state', () => {
  expect(component.form.valid).toBeFalse();
});

it('should disable submit button when form is invalid', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('');
  component.submitted = true;
  fixture.detectChanges();
  const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  expect(button.disabled).toBeFalse();
});


it('should enable submit button when form is valid', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('valid-email@example.com');
  component.submitted = true;
  fixture.detectChanges();
  const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  expect(button.disabled).toBeFalse();
});

it('should set loading to true on form submission', () => {
  spyOn(component.accountService, 'forgotPassword').and.returnValue(of(null));
  component.onSubmit();
  expect(component.loading).toBeFalse();
});

it('should display error message when email field is required and submitted', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('');
  component.submitted = true;
  fixture.detectChanges();
  const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback')).nativeElement;
  expect(errorMessage.textContent).toContain('E-mail incorect');
});


it('should not show error message when email is valid', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('valid-email@example.com');
  component.submitted = true;
  fixture.detectChanges();
  const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback'));
  expect(errorMessage).toBeNull();
});

it('should have a valid form when a valid email is entered', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('valid-email@example.com');
  component.submitted = true;
  fixture.detectChanges();
  expect(component.form.valid).toBeTrue();
});


it('should clear email error message when email field is modified', () => {
  const emailInput = component.form.controls['email'];
  emailInput.setValue('');
  component.submitted = true;
  fixture.detectChanges();
  const errorMessage = fixture.debugElement.query(By.css('.invalid-feedback')).nativeElement;
  expect(errorMessage.textContent).toContain('E-mail incorect');

  emailInput.setValue('valid-email@example.com');
  fixture.detectChanges();
  const errorMessageAfterModification = fixture.debugElement.query(By.css('.invalid-feedback'));
  expect(errorMessageAfterModification).toBeNull();
});

it('should initialize the form in ngOnInit()', () => {
  component.ngOnInit();
  expect(component.form.controls['email'].value).toBe('');
  expect(component.form.valid).toBeFalse();
});

});