import { Component } from '@angular/core';
import { User } from './models/User';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontproject';
  user?: User|null;

  constructor(private accountService: AccountService){
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout(){
    this.accountService.logout();
  }
}
