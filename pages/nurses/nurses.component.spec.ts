import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { NursesComponent } from './nurses.component';
import { AppComponent } from '../../app.component';
import { NavbarComponent } from '../../sharepage/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FooterComponent } from '../../sharepage/footer/footer.component';
import { DrugsTableComponent } from '../drugs-table/drugs-table.component';
import { ManagementComponent } from '../management/management.component';
import { HomeComponent } from '../home/home.component';

import { MyNursesService } from 'src/app/services/my-nurses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';



describe('NursesComponent', () => {
  let component: NursesComponent;
  let fixture: ComponentFixture<NursesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NursesComponent],
        imports: [RouterTestingModule, HttpClientTestingModule],
        providers: [MyNursesService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of nurses', () => {
    const nurseRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
    expect(nurseRows.length).toBe(component.nurseRows.length);
  });

  it('should have previous and next arrow buttons', () => {
    const arrowContainer = fixture.debugElement.query(By.css('.arrow-container')).nativeElement;
    expect(arrowContainer).toBeTruthy();

    const prevArrowButton = arrowContainer.querySelector('.prev-arrow');
    expect(prevArrowButton).toBeTruthy();

    const nextArrowButton = arrowContainer.querySelector('.next-arrow');
    expect(nextArrowButton).toBeTruthy();
  });

  it('should filter the list of nurses by search term', () => {
    component.searchTerm = 'John';
    fixture.detectChanges();
    const nurseRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
    const names = nurseRows.map((row) => row.query(By.css('.custom-td:nth-child(3)')).nativeElement.textContent);
    expect(names.every((name) => name.includes('John'))).toBeTruthy();
  });

  it('should display the correct details for each nurse', () => {
    const nurseRows = fixture.debugElement.queryAll(By.css('.custom-tr'));
  
    for (let i = 0; i < nurseRows.length; i++) {
      const row = nurseRows[i];
      const firstName = row.query(By.css('.custom-td:nth-child(3)')).nativeElement.textContent;
      const lastName = row.query(By.css('.custom-td:nth-child(4)')).nativeElement.textContent;
      const address = row.query(By.css('.custom-td:nth-child(5)')).nativeElement.textContent;
  
      // No expectations here, move them outside the loop
  
      // Make sure component.nurseRows has the expected data
      expect(firstName).toBe(component.nurseRows[i].firstName);
      expect(lastName).toBe(component.nurseRows[i].lastName);
      expect(address).toBe(component.nurseRows[i].email);
    }
  
    // Additional expectations outside the loop
    expect(nurseRows.length).toBe(component.nurseRows.length);
  });
  
});

