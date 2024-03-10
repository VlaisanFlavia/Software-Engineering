import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginInformation } from '../models/LoginInformation';
import { User } from '../models/User';
import { environment } from 'src/environments/environment.development';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AccountService,
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: {} },
      ]
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should call the API to login and return the user', () => {
      const loginInfo: LoginInformation = { email: 'test@example.com', password: 'password' };
      const user: User = { id: '123', firstName: 'John', lastName: 'Doe', email: 'test@example.com', medicalOfficeId: '456' };
      service.login(loginInfo).subscribe(data => {
        expect(data).toEqual(user);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/v1/signin`);
      expect(req.request.method).toBe('POST');
      req.flush(user);
    });
  });

  describe('register', () => {
    it('should call the API to register a user', () => {
      const user: User = { id: '123', firstName: 'John', lastName: 'Doe', email: 'test@example.com', medicalOfficeName: 'Medical Office: Test' };
      service.register(user).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/v1/signup`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('resetPassword', () => {
    it('should call the API to reset the user password', () => {
      const newPassword = 'newpassword';
      const token = '123';
      const user: User = { id: '123', firstName: 'John', lastName: 'Doe', email: 'test@example.com', medicalOfficeId: '456' };
      service.resetPassword(newPassword, token).subscribe(data => {
        expect(data).toEqual(user);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/v1/changePassword?token=${token}`);
      expect(req.request.method).toBe('POST');
      req.flush(user);
    });
  });

  describe('forgotPassword', () => {
    it('should call the API to send reset password email', () => {
      const email = 'test@example.com';
      service.forgotPassword(email).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/api/auth/v1/resetPassword?email=${email}`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('logout', () => {
    it('should clear user from localStorage and emit an empty object', () => {
      const user: User = { id: '123', firstName: 'John', lastName: 'Doe', email: 'test@example.com', medicalOfficeId: '456' };
      localStorage.setItem('user', JSON.stringify(user));

      service.logout();

      expect(localStorage.getItem('user')).toBeNull();
      service.user.subscribe(data => {
        expect(data).toEqual({});
      });
    });
});

describe('getCabinets', () => {
  it('should call the API to get cabinets', () => {
    const cabinets = [{ id: '1', name: 'Cabinet 1' }, { id: '2', name: 'Cabinet 2' }];
    service.getCabinets().subscribe(data => {
      expect(data).toEqual(cabinets);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/medicaloffices`);
    expect(req.request.method).toBe('GET');
    req.flush(cabinets);
  });
});

describe('getter methods', () => {
  const user: User = {
    id: '123',
    role: 'user',
    email: 'test@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    medicalOfficeAddress: '123 Main St',
    cnp: '1234567890',
    birthDate: new Date(),
    specialization: 'Specialization',
    medicalOfficeName: 'Medical Office: Test',
    medicalOfficeId: '456',
    token: 'abc123',
  };

  beforeEach(() => {
    service.userSubject.next(user);
  });

  it('should return the user value', () => {
    expect(service.userValue).toEqual(user);
  });

  it('should return the userId', () => {
    expect(service.userId).toBe('123');
  });

  it('should return the firstName', () => {
    expect(service.firstName).toBe('John');
  });

  it('should return the lastName', () => {
    expect(service.lastName).toBe('Doe');
  });

  it('should return the email', () => {
    expect(service.email).toBe('test@example.com');
  });

  it('should return the medicalOfficeId', () => {
    expect(service.medicalOfficeId).toBe('456');
  });
});


});