import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription, of } from 'rxjs';

import { AlertComponent } from './alert.component';
import { AlertService } from 'src/app/services/alert.service';
import { Alert, AlertType } from 'src/app/models/Alert';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
    let alertService: AlertService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ AlertComponent ],
            imports: [ RouterTestingModule ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        alertService = TestBed.inject(AlertService);
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
    it('should have empty alerts array on initialization', () => {
        expect(component.alerts).toEqual([]);
    });
    it('should subscribe to alert service on initialization', () => {
        spyOn(alertService, 'onAlert').and.returnValue(of());
        component.ngOnInit();
        expect(alertService.onAlert).toHaveBeenCalled();
    });
    it('should not apply fade class to alert element when fade is false', () => {
        const alert: Alert = { id: '1', message: 'Test alert', type: AlertType.Success, fade: false };
        component.alerts.push(alert);
        fixture.detectChanges();
        const alertElement: HTMLElement | null = fixture.nativeElement.querySelector('.alert');
        expect(alertElement.classList.contains('fade')).toBe(false);
    });

    it('should apply fade class to alert element when fade is true', () => {
    const alert: Alert = { id: '1', message: 'Test alert', type: AlertType.Success, fade: true };
    component.alerts.push(alert);
    fixture.detectChanges();
    const alertElement: HTMLElement | null = fixture.nativeElement.querySelector('.alert');
    expect(alertElement).toBeTruthy();
    expect(alertElement!.classList.contains('fade')).toBe(true);
});

});