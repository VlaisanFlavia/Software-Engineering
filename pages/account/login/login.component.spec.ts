import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ActivatedRoute} from "@angular/router";
import {By} from "@angular/platform-browser";


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

import { AlertService } from 'src/app/services/alert.service';
import { AccountService } from 'src/app/services/account.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let router : Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule, ReactiveFormsModule ],
      providers: [AlertService, AccountService, { provide: ActivatedRoute, useValue: {} },  { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the LoginComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with 2 form controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });
  

  it('should make the form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });


  it('should create a form with empty fields', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should make the form valid when filled', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('password');
    expect(component.form.valid).toBeTruthy();
  });
  

  
  it('should create a form with valid fields', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('password');
    expect(component.form.valid).toBeTruthy();
  });

  

  it('should disable the submit button when the form is invalid', () => {
    const email = component.form.controls['email'];
    email.setValue('invalid-email');
    const password = component.form.controls['password'];
    password.setValue('');
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should enable the submit button when the form is valid', () => {
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalsy();
  });
  

  
  it('should call the onSubmit() function when the form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
  
  it('should log the email and password values when the form is submitted', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('password');
    spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.form.value.email).toBe('test@test.com');
    expect(component.form.value.password).toBe('password');
  });
  
  it('should set the loading variable to true when the form is submitted', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('password');
    component.onSubmit();
    expect(component.loading).toBeTruthy();
  });
  
});