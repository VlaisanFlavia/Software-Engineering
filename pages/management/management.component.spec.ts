import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule} from "@angular/router/testing";
import { Router, RouterLinkWithHref, ActivatedRoute, convertToParamMap } from "@angular/router";
import {routes } from 'src/app-routing.module'
import { Location } from '@angular/common';

import { ManagementComponent } from './management.component';
import { AppRoutingModule } from 'src/app-routing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from 'src/app/sharepage/navbar/navbar.component';
import { NursesComponent } from '../nurses/nurses.component';
import { DrugsTableComponent } from '../drugs-table/drugs-table.component';
import { FooterComponent } from 'src/app/sharepage/footer/footer.component';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from '../home/home.component';

describe('ManagementComponent', () => {
  let component: ManagementComponent;
  let fixture: ComponentFixture<ManagementComponent>;

  let debug: DebugElement;
  let location: Location;

  let router: Router;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, NavbarComponent,
        FooterComponent,
        NursesComponent, DrugsTableComponent,
        ManagementComponent, HomeComponent],
      imports: [AppRoutingModule,
                  RouterTestingModule.withRoutes(routes)
                ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementComponent);
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


  it('test Asistente click', ()=>{
    spyOn(component, 'onNurseClick');
    component.onNurseClick();
    expect(component.onNurseClick).toHaveBeenCalled();
  });


  it('test Medicamente click', ()=>{
    spyOn(component, 'onDrugsClick');
    component.onDrugsClick();
    expect(component.onDrugsClick).toHaveBeenCalled();
  });

  
  it('test navigate to nurses page when click on Asistente',fakeAsync(()=>{
    const linkDestination = fixture.debugElement
                              .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDestination[0].nativeElement;
    nativeButton.click();
    tick();
    expect(location.path()).toBe('/nurses')
}));

it('test navigate to drugs page when click on Medicamente',fakeAsync(()=>{
  const linkDestination = fixture.debugElement
                            .queryAll(By.css('button'));
  const nativeButton: HTMLButtonElement = linkDestination[1].nativeElement;
  nativeButton.click();
  tick();
  expect(location.path()).toBe('/drugs-table');
}));

it('test onNurseClick method with correct parameters', () => {
  spyOn(component, 'onNurseClick');
  component.onNurseClick();
  expect(component.onNurseClick).toHaveBeenCalledWith();
});

it('test onDrugsClick method with correct parameters', () => {
  spyOn(component, 'onDrugsClick');
  component.onDrugsClick();
  expect(component.onDrugsClick).toHaveBeenCalledWith();
});

});
