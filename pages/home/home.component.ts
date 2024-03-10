import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: User|null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
