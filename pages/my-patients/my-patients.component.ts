import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Patient } from 'src/app/models/Patient';
import { AccountService } from 'src/app/services/account.service';
import { MyPatientsService } from 'src/app/services/my-patients.service';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.css']
})
export class MyPatientsComponent implements OnInit{
  
  myPatientsRows: Patient[] = [];
  
  constructor(private router: Router, private myPatientsService: MyPatientsService, private accountService: AccountService) {
  }


  ngOnInit(): void {
    this.myPatientsService.getMyPatientsRows(this.accountService.medicalOfficeId).subscribe((rows)=>(this.myPatientsRows=rows));
  }

  onArrowClick(){
    this.router.navigate(['../my-patients']);
  }

  onIstoricClick(patientId: string){
    this.router.navigate(['../history', patientId]);
  }

  
}
