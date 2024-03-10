import { TestBed } from '@angular/core/testing';
import { Alert, AlertType } from '../models/Alert';

import { AlertService } from './alert.service';

describe('AlertServiceService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an alert to the subject', (done) => {
    const alert: Alert = new Alert({ message: 'Test Alert' });
    service.onAlert().subscribe(result => {
      expect(result).toBe(alert);
      done();
    });
    service.alert(alert);
  });

  it('should return an observable for a specific alert', (done) => {
    const alert: Alert = new Alert({ id: 'test-alert', message: 'Test Alert' });
    service.onAlert('test-alert').subscribe(result => {
      expect(result).toBe(alert);
      done();
    });
    service.alert(alert);
  });

  it('should add a success alert', (done) => {
    const message = 'Test Success Alert';
    service.onAlert().subscribe(result => {
      expect(result.type).toBe(AlertType.Success);
      expect(result.message).toBe(message);
      done();
    });
    service.success(message);
  });

  it('should add an error alert', (done) => {
    const message = 'Test Error Alert';
    service.onAlert().subscribe(result => {
      expect(result.type).toBe(AlertType.Error);
      expect(result.message).toBe(message);
      done();
    });
    service.error(message);
  });

  it('should add an info alert', (done) => {
    const message = 'Test Info Alert';
    service.onAlert().subscribe(result => {
      expect(result.type).toBe(AlertType.Info);
      expect(result.message).toBe(message);
      done();
    });
    service.info(message);
  });
  it('should add a warning alert', (done) => {
    const message = 'Test Warning Alert';
    service.onAlert().subscribe(result => {
      expect(result.type).toBe(AlertType.Warning);
      expect(result.message).toBe(message);
      done();
    });
    service.warn(message);
  });
  
});
