import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AccountService } from 'src/app/services/account.service';
import { AppRoutingModule, routes } from 'src/app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/User';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [AppRoutingModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
        ],
        providers: [
          {
            provide: AccountService,useValue: {  userValue: { firstName: 'John', role: 'Doctor' }  }
          }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the component and bind user data', () => {
    const mockUser: User = { firstName: 'John', role: 'Doctor' };
    const accountService = TestBed.inject(AccountService);
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.user).toEqual(mockUser);
  
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element.textContent).toContain('Bine ai venit John');
  
    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toContain('Doctor');
  });
  it('should render the correct DOM structure', () => {
    const accountService = TestBed.inject(AccountService);
    fixture.detectChanges();

    const divElements = fixture.nativeElement.querySelectorAll('div');
    expect(divElements.length).toBe(2);
  
    const h1Elements = fixture.nativeElement.querySelectorAll('h1');
    expect(h1Elements.length).toBe(2);
    expect(h1Elements[0].textContent).toContain('Bine ai venit');
    expect(h1Elements[1].textContent).toContain('Logare reusita');
  
    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toBe('Doctor');
  
    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement).toBeTruthy();
  });
  it('should display the user\'s role when it is provided', () => {
    const mockUser: User = { firstName: 'John', role: 'Admin' };
    const accountService = TestBed.inject(AccountService);
 
    fixture.detectChanges();
    const h1Element = fixture.nativeElement.querySelector('h1');
    expect(h1Element.textContent).toContain('Bine ai venit John');
    const pElement = fixture.nativeElement.querySelector('p');
    expect(pElement.textContent).toContain('Doctor');
  
    const h1Elements = fixture.nativeElement.querySelectorAll('h1');
    expect(h1Elements.length).toBe(2);
    expect(h1Elements[1].textContent).toContain('Logare reusita');
  });
  
});
