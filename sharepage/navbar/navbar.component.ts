import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { ImagesService } from 'src/app/services/images.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private http: HttpClient, private imageService: ImagesService, private accountService : AccountService) {}
  profileImage: string 
  ngOnInit() {
    if(this.accountService.email != ""){
      this.imageService.getImageUrlByUserId(this.accountService.userId).subscribe((url: string) => this.profileImage = url);
    }
  }
  public getUser(): User {
    return this.accountService.userValue;
  }
  public isUserLoggedIn() : boolean {
    if(this.accountService.userId == ""){
      return false;
    }
    return Object.keys(this.getUser()).length !== 0;
  }
  public isUserDoctor() : boolean {
    return this.getUser().role === "ROLE_DOCTOR";
  }
  public isUserNurse() : boolean {
    return this.getUser().role === "ROLE_NURSE";
  }
  public isUserPatient() : boolean {
    return this.getUser().role === "ROLE_PATIENT";
  }
  public logout() : void {
    this.accountService.logout();
  }
}