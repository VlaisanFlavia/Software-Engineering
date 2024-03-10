import { NgModule } from '@angular/core';
import { ReportPageModule } from '../pages/report-page/report-page.module';
import { ProfilePageModule } from '../pages/profile-page/profile-page.module';

@NgModule({
  declarations: [],
  imports: [
    ReportPageModule,
    ProfilePageModule
  ],
  exports:[
    ReportPageModule,
    ProfilePageModule
  ]
})
export class MaterialModule { }
