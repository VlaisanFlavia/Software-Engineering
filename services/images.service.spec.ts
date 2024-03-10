import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { ImagesService } from './images.service';
import { AppRoutingModule, routes } from 'src/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilePageComponent } from '../pages/profile-page/profile-page.component';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment.development';

describe('ImagesService', () => {
  let service: ImagesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
        declarations: [ ProfilePageComponent ],
        providers: [HttpClient]
    });
    service = TestBed.inject(ImagesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getImageUrlByUserId', () => {
    const userId = '123';
    const imageUrl = 'http://example.com/image.jpg';

    it('should return the image URL for a given user ID', () => {
      service.getImageUrlByUserId(userId).subscribe((url: string) => {
        expect(url).toBe(imageUrl);
      });

      const req = httpTestingController.expectOne(`${environment.apiUrl}/api/v1/images/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(imageUrl);
    });

    it('should handle API errors and return an error Observable', () => {
      const errorMessage = 'An error occurred while fetching the image.';

      service.getImageUrlByUserId(userId).subscribe(
        () => fail('Expected error, but got success response'),
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(500);
          expect(error.error).toBe(errorMessage);
        }
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/api/v1/images/${userId}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
