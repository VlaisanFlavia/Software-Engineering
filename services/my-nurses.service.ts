import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Nurse } from '../models/Nurse';
import { NurseRow } from '../models/NurseRow';
import { environment } from 'src/environments/environment.development';
import { ImagesService } from './images.service';

@Injectable({
  providedIn: 'root'
})
export class MyNursesService {

  constructor(private http: HttpClient, private imageService: ImagesService) { }

  getMyNursesRows(medicalOfficeId: string): Observable<NurseRow[]> {
    let nurseRows: NurseRow[] = [];
    this.http.get<Nurse[]>(`${environment.apiUrl}/api/v1/nurses/offices/${medicalOfficeId}`)
      .subscribe((nurses: Nurse[]) => {
        nurses.forEach((nurse: Nurse) => {
          this.imageService.getImageUrlByUserId(nurse.id).subscribe((url : string) => {
            nurseRows.push({
              imageUrl: url,
              firstName: nurse.firstName,
              lastName: nurse.lastName,
              email: nurse.email 
            });
          })
        });
      });
    return of(nurseRows);
  }
  
  getNurseWithId(id: string) {
    return this.http.get<Nurse>(`${environment.apiUrl}/api/v1/nurses/${id}`);
  }
}
