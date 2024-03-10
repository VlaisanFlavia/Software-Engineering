import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../../sharepage/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { FooterComponent } from '../../sharepage/footer/footer.component';
import { DrugsTableComponent } from './drugs-table.component';
import { ManagementComponent } from '../management/management.component';
import { HomeComponent } from '../home/home.component';
import { NursesComponent } from '../nurses/nurses.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app-routing.module';
import {routes } from 'src/app-routing.module'
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPatientsComponent } from '../my-patients/my-patients.component';
import { FutureAppointmentsComponent } from '../future-appointments/future-appointments.component';
import { IstoricComponent } from '../istoric/istoric.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DrugsTableService } from 'src/app/services/drugs-table.service';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MedicalItem } from 'src/app/models/MedicalItem';

describe('DrugsTableComponent', () => {
  let component: DrugsTableComponent;
  let fixture: ComponentFixture<DrugsTableComponent>;

  let debug: DebugElement;
  let location: Location;

  let router: Router;

  let drugsTableService: DrugsTableService;
  let accountService: any;

  beforeEach(async () => {

    accountService = {
      medicalOfficeId: 123
    };
    await TestBed.configureTestingModule({
      declarations: [  MyPatientsComponent,
        AppComponent, NavbarComponent,
        FooterComponent,IstoricComponent,
        NursesComponent, DrugsTableComponent,
        ManagementComponent, HomeComponent, FutureAppointmentsComponent, AddButtonComponent],
        
        imports: [AppRoutingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule, FormsModule],
        providers: [HttpClient, DrugsTableService, HttpHandler, MdbModalService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugsTableComponent);
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

 
  it('test call method addButton() when click on Adauga Medicament',fakeAsync(()=>{
    spyOn(component, 'addButton');
    component.addButton();
    expect(component.addButton).toHaveBeenCalled();
  
  }));



  it('should have "Adauga medicament" button', () => {
    const addButton = fixture.debugElement.nativeElement.querySelector('#add_btn');
    expect(addButton.textContent).toContain('Adauga medicament');
  });

  // works
  it('should display the navigation arrows', () => {
    const prevArrow = fixture.debugElement.query(By.css('.prev-arrow'));
    const nextArrow = fixture.debugElement.query(By.css('.next-arrow'));
    expect(prevArrow).toBeTruthy();
    expect(nextArrow).toBeTruthy();
  });

  // works
  it('should call the onArrowClick() function when the navigation arrows are clicked', () => {
    spyOn(component, 'onArrowClick');
    const prevArrow = fixture.debugElement.query(By.css('.prev-arrow'));
    const nextArrow = fixture.debugElement.query(By.css('.next-arrow'));
    prevArrow.triggerEventHandler('click', null);
    expect(component.onArrowClick).toHaveBeenCalled();
    nextArrow.triggerEventHandler('click', null);
    expect(component.onArrowClick).toHaveBeenCalledTimes(2);
  });

  it('should navigate to "../drugs-table" when onArrowClick is called', () => {
    spyOn(router, 'navigate');
    component.onArrowClick();
    expect(router.navigate).toHaveBeenCalledWith(['../drugs-table']);
  });

  it('should display the correct number of rows in the drugs table', () => {
    const drugTableRows: MedicalItem[] = [
      { medicine: { id: '1', name: 'Medicine 1', providerCompanyName: 'Provider 1', price: 10.99 }, quantity: 10 },
      { medicine: { id: '2', name: 'Medicine 2', providerCompanyName: 'Provider 2', price: 9.99 }, quantity: 5 },
      { medicine: { id: '3', name: 'Medicine 3', providerCompanyName: 'Provider 3', price: 7.99 }, quantity: 2 }
    ];
  
    component.drugTableRows = drugTableRows;
    fixture.detectChanges();
  
    const tableRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
    expect(tableRows.length).toEqual(drugTableRows.length);
  });

  it('should add a button when "addButton" is called', () => {
    const addButton = fixture.nativeElement.querySelector('#add_btn');
    expect(addButton).toBeTruthy();

    spyOn(component, 'addButton');

    addButton.click();

    expect(component.addButton).toHaveBeenCalled();
  });

  it('should call "onArrowClick" when previous arrow is clicked', () => {
    const prevArrow = fixture.nativeElement.querySelector('.prev-arrow');
    expect(prevArrow).toBeTruthy();

    spyOn(component, 'onArrowClick');

    prevArrow.click();

    expect(component.onArrowClick).toHaveBeenCalled();
  });

  it('should call "onArrowClick" when next arrow is clicked', () => {
    const nextArrow = fixture.nativeElement.querySelector('.next-arrow');
    expect(nextArrow).toBeTruthy();

    spyOn(component, 'onArrowClick');

    nextArrow.click();

    expect(component.onArrowClick).toHaveBeenCalled();
  });

  it('should call "addButton" when "Add Medicament" button is clicked', () => {
    const addButton = fixture.nativeElement.querySelector('#add_btn');
    expect(addButton).toBeTruthy();
  
    spyOn(component, 'addButton');
  
    addButton.click();
  
    expect(component.addButton).toHaveBeenCalled();
  });

  it('should call "onArrowClick" when previous arrow button is clicked', () => {
    const prevArrow = fixture.nativeElement.querySelector('.prev-arrow');
    expect(prevArrow).toBeTruthy();
  
    spyOn(component, 'onArrowClick');
  
    prevArrow.click();
  
    expect(component.onArrowClick).toHaveBeenCalled();
  });

  it('should call "onArrowClick" when next arrow button is clicked', () => {
    const nextArrow = fixture.nativeElement.querySelector('.next-arrow');
    expect(nextArrow).toBeTruthy();
  
    spyOn(component, 'onArrowClick');
  
    nextArrow.click();
  
    expect(component.onArrowClick).toHaveBeenCalled();
  });

  it('should render the drug table rows correctly', () => {
    const drugTableRows = fixture.nativeElement.querySelectorAll('.custom-tr');
  
    expect(drugTableRows.length).toBe(component.drugTableRows.length);
  
    drugTableRows.forEach((row, index) => {
      const drugTableRow = component.drugTableRows[index];
  
      const nameColumn = row.querySelector('.custom-td:nth-child(1)');
      const quantityColumn = row.querySelector('.custom-td:nth-child(2)');
  
      expect(nameColumn.textContent.trim()).toBe(drugTableRow.medicine.name);
      expect(quantityColumn.textContent.trim()).toBe(drugTableRow.quantity.toString());
    });
  });
  
  

  it('should call "onClickSubtractRow" with the correct drugTableRow when subtract button is clicked', () => {
    const subtractButtons = fixture.nativeElement.querySelectorAll('.btn-actualizare:nth-child(1)');
  
    subtractButtons.forEach((subtractButton, index) => {
      const drugTableRow = component.drugTableRows[index];
  
      spyOn(component, 'onClickSubtractRow');
  
      subtractButton.click();
  
      expect(component.onClickSubtractRow).toHaveBeenCalledWith(drugTableRow);
    });
    expect(subtractButtons.length).toBe(component.drugTableRows.length);
  });
  
  
  it('should call "onClickDeleteItem" with the correct drugTableRow when delete button is clicked', () => {
    const deleteButtons = fixture.nativeElement.querySelectorAll('.btn-actualizare:nth-child(2)');
  
    deleteButtons.forEach((deleteButton, index) => {
      const drugTableRow = component.drugTableRows[index];
  
      spyOn(component, 'onClickDeleteItem');
  
      deleteButton.click();
  
      expect(component.onClickDeleteItem).toHaveBeenCalledWith(drugTableRow);
    });
    expect(deleteButtons.length).toBe(component.drugTableRows.length);
  });
  
});