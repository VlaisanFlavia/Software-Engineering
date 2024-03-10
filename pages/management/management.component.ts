import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  constructor(private router: Router) { }

  onDrugsClick() {
    this.router.navigate(['../drugs-table']);
  }

  onNurseClick() {
    // this.router.navigateByUrl('../home');
    this.router.navigate(['../nurses']);
  }
}
