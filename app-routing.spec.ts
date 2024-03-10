// import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from "@angular/core/testing";
// import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
// import { RouterTestingModule } from "@angular/router/testing";
// import { Router, RouterLinkWithHref, ActivatedRoute, convertToParamMap } from "@angular/router";
// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { AppComponent } from "./app.component";
// import { HomeComponent } from "./pages/home/home.component";
// import { ManagementComponent } from "./pages/management/management.component";
// import { NursesComponent } from "./pages/nurses/nurses.component";
// import { DrugsTableComponent } from "./pages/drugs-table/drugs-table.component";
// import { MyPatientsComponent } from './pages/my-patients/my-patients.component';
// import { Location } from "@angular/common";
// import { NavbarComponent } from "./sharepage/navbar/navbar.component";
// import { FooterComponent } from "./sharepage/footer/footer.component";
// import { FormsModule } from "@angular/forms";
// import { By } from "@angular/platform-browser";
// import { AddButtonComponent } from "./pages/drugs-table/add-button/add-button.component";
// import { DrugsTableService } from "./services/drugs-table.service";
// import { MyPatientsService } from "./services/my-patients.service";
// import { MyNursesService } from "./services/my-nurses.service";
// import { MedicineService } from "./services/medicine.service";
// import { routes } from "../app-routing.module";
// import { MedicalOfficeService } from "./services/medical-office.service";
// import { ProfilePageService } from "./services/profile-page.service";
// import { AppointmentsService } from "./services/appointments.service";
// import { ImagesService } from "./services/images.service";
// import { AlertComponent } from "./alert/alert/alert.component";

// describe('AppComponent Routing Test', () => {
//   let router: Router;
//   let appComponent: AppComponent;

//   let appFixture: ComponentFixture<AppComponent>;
//   let debugElement: DebugElement;
//   let location: Location;

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         FormsModule,
//         RouterTestingModule.withRoutes(routes),
//         HttpClientTestingModule
//       ],
//       declarations: [
//         AppComponent, NavbarComponent,
//         FooterComponent,
//         NursesComponent, DrugsTableComponent,
//         ManagementComponent, HomeComponent,
//         MyPatientsComponent,
//         AddButtonComponent,
//         AlertComponent
//       ],
//       providers: [
//         DrugsTableService, MyPatientsService, MyNursesService, MedicineService,
//         MedicalOfficeService, ProfilePageService, AppointmentsService, ImagesService
//       ]
//     }).compileComponents();
//   }));

//   beforeEach(() => {
//     router = TestBed.inject(Router);
//     location = TestBed.inject(Location);

//     appFixture=TestBed.createComponent(AppComponent);
//     appComponent = appFixture.componentInstance;
//     appFixture.detectChanges();
//     debugElement = appFixture.debugElement;

//     router.initialNavigation();
//   });

//   it('test navigate to path when clicked on link from navbar', fakeAsync(() => {
//     const navbarComponentDebugElement = debugElement.query(By.directive(NavbarComponent));
//     const links = navbarComponentDebugElement.queryAll(By.directive(RouterLinkWithHref));
  
//     links[0].nativeElement.click();
//     tick();
//     expect(location.path()).toBe('/home');
  
//     links[1].nativeElement.click();
//     tick();
//     expect(location.path()).toBe('/my-patients');

//     links[2].nativeElement.click();
//     tick();
//     expect(location.path()).toBe('/appointments');

//     // links[3].nativeElement.click();
//     // tick();
//     // expect(location.path()).toBe('/pacient-appointment');
  
//     // links[4].nativeElement.click();
//     // tick();
//     // expect(location.path()).toBe('/history-appointments');
  
  
//     // links[5].nativeElement.click();
//     // tick();
//     // expect(location.path()).toBe('/management');
  
//   }));

// });  
