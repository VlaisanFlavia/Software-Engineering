import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SuccesComponent } from './succes.component';
import { Router } from '@angular/router';

describe('SuccesComponent', () => {
  let component: SuccesComponent;
  let fixture: ComponentFixture<SuccesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SuccesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inject the Router instance
    spyOn(router, 'navigateByUrl'); // Spy on navigateByUrl method
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display success message', () => {
    const successMessage = fixture.debugElement.query(By.css('.success-message'));
    expect(successMessage).toBeTruthy();
  });

  it('should display the correct success message text', () => {
    const successMessageText = fixture.debugElement.query(By.css('.success-message h1')).nativeElement.textContent;
    expect(successMessageText).toContain('Programare făcută cu succes!');
  });
});
