import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor(private http: HttpClient) { }

  downloadFinishedReportPDF(medicalReportId: string) {
    this.http.get(`${environment.apiUrl}/api/v1/reports/generate/${medicalReportId}`, { responseType: 'arraybuffer' })
    .subscribe((data: ArrayBuffer) => {
      this.saveByteArrayToFile(data, medicalReportId + '.pdf');
    });
  }

  saveByteArrayToFile(data: ArrayBuffer, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    saveAs(blob, filename);
  }
}
