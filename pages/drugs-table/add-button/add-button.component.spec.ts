import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { routes } from 'src/app-routing.module';


import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MdbModalRef, MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { of } from 'rxjs';

import { AddButtonComponent } from './add-button.component';
import { MedicineService } from 'src/app/services/medicine.service';
import { MedicalItemService } from 'src/app/services/medical-item.service';
import { AccountService } from 'src/app/services/account.service';
import { Medicine } from 'src/app/models/Medicine';


class MockMdbModalRef {
}

describe('AddButtonComponent', () => {
  let component: AddButtonComponent;
  let fixture: ComponentFixture<AddButtonComponent>;
  let medicineServiceSpy: jasmine.SpyObj<MedicineService>;
  let medicalItemServiceSpy: jasmine.SpyObj<MedicalItemService>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;


  beforeEach(() => {
    const medicineSpy = jasmine.createSpyObj('MedicineService', ['getMedicineOptions']);
    const medicalItemSpy = jasmine.createSpyObj('MedicalItemService', ['addMedicalItem']);
    const accountSpy = jasmine.createSpyObj('AccountService', ['getMedicalOfficeId']);

    TestBed.configureTestingModule({
      declarations: [AddButtonComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        MdbModalModule
      ],
      providers: [
        { provide: MedicineService, useValue: medicineSpy },
        { provide: MedicalItemService, useValue: medicalItemSpy },
        { provide: AccountService, useValue: accountSpy },
        { provide: MdbModalRef, useClass: MockMdbModalRef },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddButtonComponent);
    component = fixture.componentInstance;

    medicineServiceSpy = TestBed.inject(MedicineService) as jasmine.SpyObj<MedicineService>;
    medicalItemServiceSpy = TestBed.inject(MedicalItemService) as jasmine.SpyObj<MedicalItemService>;
    accountServiceSpy = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;

    medicineServiceSpy.getMedicineOptions.and.returnValue(of([]));
    medicalItemServiceSpy.addMedicalItem.and.returnValue(of());

    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should return false when medicine is not selected', fakeAsync(() => {
    component.selectedMedicine = null;
    const result = component.isSelectedMedicine();
    expect(result).toBeFalse();
  }));

  it('should return false when quantity is not valid', fakeAsync(() => {

    component.reactiveForm.controls['cantitate'].setValue('invalid quantity');
    const result = component.isValidQuantity();
    tick();
    expect(result).toBeFalse();
  }));
  it('should return the correct medicine price when a medicine is selected', fakeAsync(() => {
    const selectedMedicine: Medicine = {
      name: 'Medicine 1', price: 10,
      id: '',
      providerCompanyName: ''
    };
    component.selectedMedicine = selectedMedicine;
    const result = component.getMedicinePrice();
    expect(result).toBe(selectedMedicine.price);
  }));

  it('should return 0 when no medicine is selected', fakeAsync(() => {
    component.selectedMedicine = null;
    const result = component.getMedicinePrice();
    expect(result).toBe(0);
  }));


  it('should return false when no medicine is selected', fakeAsync(() => {
    component.selectedMedicine = null;
    component.reactiveForm.controls['cantitate'].setValue(5);
    const result = component.validateForm();
    expect(result).toBeFalse();
  }));
  it('should display an error message when the medicine is not selected', () => {
    component.selectedMedicine = null;
    component.reactiveForm.controls['cantitate'].setValue(5);
    component.isSelectedName = true;
    fixture.detectChanges();
    const errorMessage = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorMessage.textContent).toContain('Selectați un medicament!');
  });

  it('should not apply red border to the quantity input when it is valid', () => {
    const selectedMedicine = { name: 'Medicine 1', price: 10 };
    component.reactiveForm.controls['cantitate'].setValue(5);
    fixture.detectChanges();
    const quantityInput = fixture.nativeElement.querySelector('#CantitateMedicament');
    expect(quantityInput.style.border).toBe('');
  });
  it('should set isSelectedName to true when form submission is attempted with invalid form data', () => {
    component.selectedMedicine = null;
    component.reactiveForm.controls['cantitate'].setValue(-5);
    component.onSubmit();
    expect(component.isSelectedName).toBeTrue();
  });
  it('should populate medicinesOptions with values from the service', fakeAsync(() => {
    const mockMedicineOptions: Medicine[] = [{ name: 'Medicine 1', price: 10, id: 'id1', providerCompanyName: 'comp1' }, { name: 'Medicine 2', price: 20, id: 'id2', providerCompanyName: 'comp2' }];
    medicineServiceSpy.getMedicineOptions.and.returnValue(of(mockMedicineOptions));
    component.ngOnInit();
    tick();
    expect(component.medicinesOptions).toEqual(mockMedicineOptions);
  }));

});
