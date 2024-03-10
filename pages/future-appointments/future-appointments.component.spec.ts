import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { FutureAppointmentsComponent } from './future-appointments.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { NavbarComponent } from 'src/app/sharepage/navbar/navbar.component';
import { ReportPageComponent } from '../report-page/report-page.component';
import { FooterComponent } from 'src/app/sharepage/footer/footer.component';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from '../home/home.component';
import { of } from 'rxjs';

describe('FutureAppointmentsComponent', () => {
  let component: FutureAppointmentsComponent;
  let fixture: ComponentFixture<FutureAppointmentsComponent>;
  let debug: DebugElement;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FutureAppointmentsComponent,
        AppComponent,
        NavbarComponent,
        FooterComponent,
        ReportPageComponent,
        HomeComponent
      ],
      imports: [
        AppRoutingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        HttpClient,
        AppointmentsService,
        HttpHandler
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FutureAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test Finalizeaza click', () => {
    spyOn(component, 'onCompleteClick');
    component.onCompleteClick('111');
    expect(component.onCompleteClick).toHaveBeenCalledWith('111');
  });
  
it('test navigate to report form page when click on Finalizeaza', fakeAsync(() => {
  const buttons = fixture.debugElement.queryAll(By.css('#id_button'));

  for (let i = 0; i < buttons.length; i++) {
    const nativeButton: HTMLButtonElement = buttons[i].nativeElement;
    nativeButton.click();
    tick();
    expect(component.onCompleteClick).toHaveBeenCalledWith('111');
    expect(router.navigate).toHaveBeenCalledWith(['/report-page', '111']);
  }
  expect(location.path()).toBe('');
}));
it('should have an empty array of appointments initially', () => {
  expect(component.appointments).toEqual([]);
});
it('should navigate to the report page when finalize button is clicked', () => {
  const mockAppointment = {id: 'id1'};
  const navigateSpy = spyOn(router, 'navigate');

  component.onCompleteClick(mockAppointment.id);

  expect(navigateSpy).toHaveBeenCalledWith(['../report-page', mockAppointment.id]);
});

});
