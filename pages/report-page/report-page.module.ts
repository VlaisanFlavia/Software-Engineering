import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { ReportPageComponent } from './report-page.component';
import { MedicalReportService } from 'src/app/services/medical-report.service';

@NgModule({
  declarations: [
    ReportPageComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [MedicalReportService],
  bootstrap:[ReportPageComponent]  

})
export class ReportPageModule { }
