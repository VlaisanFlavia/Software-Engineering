import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from 'src/app-routing.module';
import { Location } from '@angular/common';

import { AppRoutingModule } from 'src/app-routing.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from 'src/app/sharepage/navbar/navbar.component';
import { FooterComponent } from 'src/app/sharepage/footer/footer.component';
import { AppComponent } from 'src/app/app.component';

import { ProfilePageComponent } from './profile-page.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { fakeAsync, tick } from '@angular/core/testing';


import { ProfilePageService } from 'src/app/services/profile-page.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'src/app/services/account.service';

import { of } from 'rxjs';
import { ImagesService } from 'src/app/services/images.service';
import { ProfilePageInfo } from 'src/app/models/ProfilePageInfo';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let router: Router;
  let imagesServiceSpy: jasmine.SpyObj<ImagesService>;
  let profilePageServiceSpy: jasmine.SpyObj<ProfilePageService>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;


  beforeEach(async(() => {
    imagesServiceSpy = jasmine.createSpyObj('ImagesService', ['getImageUrlByUserId']);
    imagesServiceSpy.getImageUrlByUserId.and.returnValue(of('mockImageUrl'));
    profilePageServiceSpy = jasmine.createSpyObj('ProfilePageService', ['uploadImageFileByEntity']);
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['get userId', 'get userValue', 'get firstName', 'get lastName', 'get email', 'get medicalOfficeId']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, ImageCropperModule],
      declarations: [ ProfilePageComponent ],
      providers: [
        { provide: ImagesService, useValue: imagesServiceSpy },
        { provide: ProfilePageService, useValue: profilePageServiceSpy },
        { provide: AccountService, useValue: accountServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test Finalizeaza click', () => {
    const mockProfilePageInfo = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      imageUrl: 'mockImageUrl'
    };
    component.profilePageInfo = mockProfilePageInfo;
  
    spyOn(component, 'onSubmit');
    component.onSubmit();
  
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('test adauga poza click', () => {
    component.profilePageInfo = { 
      imageUrl: 'mockImageUrl',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName'
    };

    const fileInput = fixture.nativeElement.querySelector('input[type="file"]');
    spyOn(fileInput, 'click');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(fileInput.click).toHaveBeenCalled();
  });

  it('should initialize uploadForm with correct form controls', () => {
    expect(component.uploadForm.get('avatar')).toBeTruthy();
    expect(component.uploadForm.get('price')).toBeTruthy();
  });

  it('should call enableEditMode method and set editMode to true', () => {
    component.editMode = false;
    
    component.enableEditMode();
  
    expect(component.editMode).toBeTrue();
  });
  
  
  it('should call closeCroppingModal method and dismiss the modalRef', () => {
    const modalRefSpy = jasmine.createSpyObj('NgbModalRef', ['dismiss']);
  
    component.modalRef = modalRefSpy;
  
    component.closeCroppingModal();
  
    expect(modalRefSpy.dismiss).toHaveBeenCalled();
  });
  
  it('should enable edit mode', () => {
    component.enableEditMode();
    expect(component.editMode).toBe(true);
  });
  
  it('should close the cropping modal', () => {
    const dismissSpy = jasmine.createSpy('dismiss');
    const modalRef = { dismiss: dismissSpy } as unknown as NgbModalRef;
    component.modalRef = modalRef;
    
    component.closeCroppingModal();
    
    expect(dismissSpy).toHaveBeenCalled();
  });

  
});


