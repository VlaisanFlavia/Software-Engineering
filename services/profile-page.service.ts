import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageService {

  constructor(private http: HttpClient, private accountService : AccountService) { }
  
  uploadImageFileByEntity(imageFile: File, id: string) {
    var fd = new FormData();
    fd.append('file', imageFile);
    fd.append('reportProgress', 'true');

    return this.http.post(`${environment.apiUrl}/api/v1/images?entityId=${this.accountService.userId}`, fd);
  }
}
