import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ImagesService } from 'src/app/services/images.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountService } from 'src/app/services/account.service';
import { RouterTestingModule } from '@angular/router/testing';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let imagesService: ImagesService;
  let accountService: AccountService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ImagesService, AccountService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    imagesService = TestBed.inject(ImagesService);
    accountService = TestBed.inject(AccountService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});