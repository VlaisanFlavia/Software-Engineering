import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/models/Medicine';
import { MedicineService } from 'src/app/services/medicine.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MedicalItem } from 'src/app/models/MedicalItem';
import { MedicalItemService } from 'src/app/services/medical-item.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {

  medicinesOptions: Medicine[] = [];
  selectedMedicine: Medicine;
  isSelectedName : boolean = false;

  constructor(
      private route: Router,
      private medicineService: MedicineService,
      public modalRef: MdbModalRef<AddButtonComponent>,
      private medicalItemService: MedicalItemService,
      private accountService: AccountService
  ) { }

  reactiveForm: FormGroup;
  selectedOption: Medicine;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      denumire: new FormControl(null,  [Validators.required]),
      cantitate: new FormControl(null,  [Validators.required]),
    });

    this.medicineService.getMedicineOptions().subscribe((options) => {
      this.medicinesOptions = options;
    });
  }

  onOptionSelected(): void {
    console.log(this.selectedOption.name);
  }

  isSelectedMedicine(): boolean {
    return !!this.selectedMedicine;
  }

  isValidQuantity(): boolean{
    let quantity: any = this.reactiveForm.value.cantitate;
    return quantity != null && !isNaN(Number(quantity)) && quantity > 0;
  }

  getMedicinePrice(): number {
    if (this.isSelectedMedicine()) {
      return this.selectedMedicine.price;
    }
    return 0;
  }

  validateForm(): boolean {
    let valid: boolean = true;
    if (!this.isSelectedMedicine()) {
      this.reactiveForm.controls['denumire'].setErrors({'required': true});
      valid = false;
    }
    if (!this.isValidQuantity()) {
      this.reactiveForm.controls['cantitate'].setErrors({'invalid': true});
      valid = false;
    }
    return valid;
  }




  onSubmit(){
    if (this.validateForm()) {
      let quantity: number = this.reactiveForm.value.cantitate;
      let medicine: Medicine = this.selectedMedicine;
      const medicalItem: MedicalItem = {medicine, quantity};

      this.medicalItemService.addMedicalItem(medicalItem, this.accountService.medicalOfficeId).subscribe(
          () => {
            this.route.navigate(['../drugs-table']);
            this.modalRef.close();
            window.location.reload();
          }
      );
    }else{
      this.isSelectedName = true;
    }
  }

}
