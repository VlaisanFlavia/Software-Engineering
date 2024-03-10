import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NurseRow } from 'src/app/models/NurseRow';
import { AccountService } from 'src/app/services/account.service';
import { MyNursesService } from 'src/app/services/my-nurses.service';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.css']
})
export class NursesComponent {
  nurseRows: NurseRow[] = []
  searchTerm = ''; // adaugare proprietate searchTerm

  constructor(private router: Router, private myNursesService: MyNursesService, private accountService: AccountService) { }
  onArrowClick() {
    this.router.navigate(['../nurses']);
  }

  ngOnInit(): void {
    this.myNursesService.getMyNursesRows(this.accountService.medicalOfficeId).subscribe((rows: NurseRow[]) => (this.nurseRows = rows));
  }
}



