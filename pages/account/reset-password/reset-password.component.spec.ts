import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import {By} from "@angular/platform-browser";
import { throwError, of } from 'rxjs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let accountService: AccountService;
  let alertService: AlertService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the ResetPasswordComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup with password and confirmPassword controls', () => {
    expect(component.form.contains('password')).toBe(true);
    expect(component.form.contains('confirmPassword')).toBe(true);
  });

  it('should make the password control required and set a minimum length of 8 characters', () => {
    const control = component.form.get('password')!;
    control.setValue('');
    expect(control.valid).toBe(false);

    control.setValue('1234567');
    expect(control.valid).toBe(false);

    control.setValue('12345678');
    expect(control.valid).toBe(true);
  });

  it('should make the password control required and set a minimum length of 8 characters', () => {
    const control = component.form.get('password');
    if (control) {
      control.setValue('');
      expect(control.valid).toBe(false);
  
      control.setValue('1234567');
      expect(control.valid).toBe(false);
  
      control.setValue('12345678');
      expect(control.valid).toBe(true);
    } else {
      fail('Password control not found.');
    }
  });

  it('should show an error message when the passwords do not match', () => {
    const passwordControl = component.form.get('password') as FormControl;
    const confirmPasswordControl = component.form.get('confirmPassword') as FormControl;

    passwordControl.setValue('password');
    confirmPasswordControl.setValue('notMatching');

    expect(component.form.valid).toBe(false);
    expect(confirmPasswordControl.hasError('confirmedValidator')).toBe(true);
  });

  it('should not show an error message when the passwords match', () => {
    const passwordControl = component.form.get('password');
    if (passwordControl) {
       passwordControl.setValue('password');
    }

    const confirmPasswordControl = component.form.get('confirmPassword');
    if (confirmPasswordControl) {
      confirmPasswordControl.setValue('password');

      expect(component.form.valid).toBe(true);
      expect(confirmPasswordControl.hasError('confirmedValidator')).toBe(false);
    }

  });

  it('should disable submit button after loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(button.disabled).toBeTrue();
  });


  it('should call onSubmit() method when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should display a loading spinner when the loading flag is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.spinner-border'));
    expect(spinner).toBeDefined();
  });

  it('should create a FormGroup with password and confirmPassword controls', () => {
    expect(component.form.contains('password')).toBeTrue();
    expect(component.form.contains('confirmPassword')).toBeTrue();
  });

  it('should make the password control required and set a minimum length of 8 characters', () => {
    const control = component.form.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  
    control?.setValue('1234567');
    expect(control?.valid).toBeFalse();
  
    control?.setValue('12345678');
    expect(control?.valid).toBeTrue();
  });
  
  it('should show an error message when the passwords do not match', () => {
    const passwordControl = component.form.get('password');
    const confirmPasswordControl = component.form.get('confirmPassword');
    passwordControl?.setValue('password');
    confirmPasswordControl?.setValue('notMatching');
  
    expect(component.form.valid).toBeFalse();
    expect(confirmPasswordControl?.hasError('confirmedValidator')).toBeTrue();
  });
  

  it('should disable submit button after loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(button.disabled).toBeTrue();
  });

  it('should call onSubmit() method when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should display a loading spinner when the loading flag is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.nativeElement.querySelector('.spinner-border');
    expect(spinner).toBeDefined();
  });

  it('should validate form and passwords match', () => {
    const passwordControl = component.form.get('password');
    const confirmPasswordControl = component.form.get('confirmPassword');
    
    passwordControl?.setValue('password');
    confirmPasswordControl?.setValue('password');

    expect(component.form.valid).toBe(true);
    expect(passwordControl?.hasError('confirmedValidator')).toBe(false);
    expect(confirmPasswordControl?.hasError('confirmedValidator')).toBe(false);
  });

  it('should validate form and passwords do not match', () => {
    const passwordControl = component.form.get('password');
    const confirmPasswordControl = component.form.get('confirmPassword');
  
    if (passwordControl && confirmPasswordControl) {
      passwordControl.setValue('password');
      confirmPasswordControl.setValue('notMatching');
  
      expect(component.form.valid).toBeFalse();
      expect(confirmPasswordControl.hasError('confirmedValidator')).toBeTrue();
    } else {
      fail('Password control(s) not found.');
    }
  });
  

  it('should call onSubmit() when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });
});