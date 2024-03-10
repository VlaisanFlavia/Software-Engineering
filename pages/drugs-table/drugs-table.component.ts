import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicalItem } from 'src/app/models/MedicalItem';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddButtonComponent } from './add-button/add-button.component';

import { DrugsTableService } from 'src/app/services/drugs-table.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-drugs-table',
  templateUrl: './drugs-table.component.html',
  styleUrls: ['./drugs-table.component.css']
})

export class DrugsTableComponent implements OnInit {
  drugTableRows: MedicalItem[] = [];
  modalRef: MdbModalRef<AddButtonComponent>;

  constructor(private modalService: MdbModalService, private router: Router, 
    private drugsTableService: DrugsTableService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.drugsTableService.getDrugTableRows(this.accountService.medicalOfficeId).subscribe((rows) => (this.drugTableRows = rows));
  }

  onArrowClick() {
    this.router.navigate(['../drugs-table']);
  }


  addButton() {
    //this.router.navigate(['/add-button']);
    this.modalRef = this.modalService.open(AddButtonComponent);
  }

  onClickSubtractRow(drugTableRow : MedicalItem) {
    this.drugsTableService.subtractRow(drugTableRow, this.accountService.medicalOfficeId).subscribe((
      () => {
        let updateDrugIndex = this.drugTableRows.findIndex((drugRow) => drugRow.medicine.id === drugTableRow.medicine.id);
        this.drugTableRows[updateDrugIndex].quantity--; 
      }
    ))
  }
  onClickDeleteItem(drugTableRow: MedicalItem) {
    this.drugsTableService.deleteRow(drugTableRow, this.accountService.medicalOfficeId).subscribe(
      () => {
        this.drugTableRows = this.drugTableRows.filter(drugRow => drugRow.medicine.id !== drugTableRow.medicine.id)
    });
  }
}
