import { TestBed } from '@angular/core/testing';
import * as FileSaver from 'file-saver';

import { PdfGeneratorService } from './pdf-generator.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.development';

describe('PdfGeneratorService', () => {
  let service: PdfGeneratorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PdfGeneratorService]
    });

    service = TestBed.inject(PdfGeneratorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download a finished report PDF', () => {
    const mockMedicalReportId = '123';

    spyOn(service, 'saveByteArrayToFile');

    service.downloadFinishedReportPDF(mockMedicalReportId);

    const req = httpMock.expectOne(`${environment.apiUrl}/api/v1/reports/generate/${mockMedicalReportId}`);
    expect(req.request.method).toBe('GET');
    req.flush(new ArrayBuffer(10)); 

    expect(service.saveByteArrayToFile).toHaveBeenCalledWith(jasmine.any(ArrayBuffer), mockMedicalReportId + '.pdf');
  });

  it('should save the byte array to a file', () => {
    const mockData = new ArrayBuffer(10);
    const mockFilename = 'test.pdf';

    spyOn(FileSaver, 'saveAs');

    service.saveByteArrayToFile(mockData, mockFilename);

    expect(FileSaver.saveAs).toHaveBeenCalledWith(jasmine.any(Blob), mockFilename);
  });


});