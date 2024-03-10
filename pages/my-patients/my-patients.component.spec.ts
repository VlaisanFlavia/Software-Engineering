import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { routes } from 'src/app-routing.module'
import { Location } from '@angular/common';

import { AppRoutingModule } from 'src/app-routing.module';
import { DebugElement} from '@angular/core';

import { NavbarComponent } from 'src/app/sharepage/navbar/navbar.component';
import { FooterComponent } from 'src/app/sharepage/footer/footer.component';
import { AppComponent } from 'src/app/app.component';
import { IstoricComponent } from '../istoric/istoric.component';
import { MyPatientsComponent } from './my-patients.component';
import { NursesComponent } from '../nurses/nurses.component';
import { DrugsTableComponent } from '../drugs-table/drugs-table.component';
import { ManagementComponent } from '../management/management.component';
import { HomeComponent } from '../home/home.component';
import { FutureAppointmentsComponent } from '../future-appointments/future-appointments.component';
import { MyPatientsService } from 'src/app/services/my-patients.service';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'src/app/services/account.service';
import { of } from 'rxjs';

describe('MyPatientsComponent', () => {
  let component: MyPatientsComponent;
  let fixture: ComponentFixture<MyPatientsComponent>;
  const mockReturnValue = [
    {
      id: "idMock",
      firstName: "firstName",
      lastName: "lastName",
      cnp: "cnp",
      email: "string"
    }];
  const accountServiceSpy = jasmine.createSpyObj('AccountService', ['callGet']);
  accountServiceSpy.callGet.and.returnValue(of(mockReturnValue));

  let debug: DebugElement;
  let location: Location;

  let router: Router;

  beforeEach(async () => {
    const myPatientsServiceMock = jasmine.createSpyObj('MyPatientsService', ['getMyPatientsRows']);
    myPatientsServiceMock.getMyPatientsRows.and.returnValue(of(mockReturnValue));
    await TestBed.configureTestingModule({
      declarations: [MyPatientsComponent,
        AppComponent, NavbarComponent,
        FooterComponent, IstoricComponent,
        NursesComponent, DrugsTableComponent,
        ManagementComponent, HomeComponent, FutureAppointmentsComponent],
      imports: [AppRoutingModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule],

      providers: [
        { provide: MyPatientsService, useValue: myPatientsServiceMock },
        { provide: AccountService, useValue: accountServiceSpy }
      ]

    })
      .compileComponents();

    fixture = TestBed.createComponent(MyPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);


    debug = fixture.debugElement;
    router.initialNavigation();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('test Istoric click', () => {
    spyOn(component, 'onIstoricClick');
    component.onIstoricClick('123');
    expect(component.onIstoricClick).toHaveBeenCalled();
  });


  it('test navigate to Istoric page when click on Istoric', fakeAsync(() => {
    const buttons = fixture.debugElement.queryAll(By.css('#ist_test'));
    for (let i = 0; i < buttons.length; i++) {
      const nativeButton: HTMLButtonElement = buttons[i].nativeElement;
      nativeButton.click();
      tick();
      expect(location.path()).toEqual('/history/idMock');
    }
  }));


  it('should have a search input field', () => {
    const searchInput = fixture.nativeElement.querySelector('input[name="search"]');
    expect(searchInput).toBeTruthy();
  });


  it('should call onArrowClick() method when the prev-arrow and next-arrow buttons are clicked', () => {
    spyOn(component, 'onArrowClick');
    const prevArrowButton = fixture.nativeElement.querySelector('.prev-arrow');
    const nextArrowButton = fixture.nativeElement.querySelector('.next-arrow');
    prevArrowButton.click();
    nextArrowButton.click();
    expect(component.onArrowClick).toHaveBeenCalledTimes(2);
  });


  it('should have a table with custom headers and rows', () => {
    const tableElement = fixture.nativeElement.querySelector('#MyPatientsTable');
    expect(tableElement).toBeTruthy();

    const headerElements = tableElement.querySelectorAll('.custom-header-box .custom-th');
    expect(headerElements.length).toBe(3);
    expect(headerElements[0].textContent).toContain('NUME');
    expect(headerElements[1].textContent).toContain('PRENUME');

    const rowElements = tableElement.querySelectorAll('tbody .custom-tr');
    expect(rowElements.length).toBe(component.myPatientsRows.length);
    expect(rowElements[0].querySelector('.custom-td:nth-child(2)').textContent).toContain(component.myPatientsRows[0].lastName);
    expect(rowElements[0].querySelector('.custom-td:nth-child(3)').textContent).toContain(component.myPatientsRows[0].firstName);
  });

  it('should called onIstoricClick when press on ISTORIC', () =>{
    spyOn(component, 'onIstoricClick');
    const istoricBtn = fixture.debugElement.nativeElement.querySelector('#ist_test');
    istoricBtn.click();
    expect(component.onIstoricClick).toHaveBeenCalled();
  });

});


