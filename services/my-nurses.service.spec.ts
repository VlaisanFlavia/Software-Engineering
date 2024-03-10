import { TestBed } from '@angular/core/testing';

import { MyNursesService } from './my-nurses.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagesService } from './images.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

describe('MyNursesService', () => {

    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let imageServiceSpy: jasmine.SpyObj<ImagesService>;
    let myNursesService: MyNursesService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    imageServiceSpy = jasmine.createSpyObj('ImageService', ['getImageUrlByUserId']);

    TestBed.configureTestingModule({
      providers: [
        MyNursesService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ImagesService, useValue: imageServiceSpy }
      ]
    });

    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    imageServiceSpy = TestBed.inject(ImagesService) as jasmine.SpyObj<ImagesService>;
    myNursesService = TestBed.inject(MyNursesService);
  });

  it('should be created', () => {
    expect(myNursesService).toBeTruthy();
  });


  describe('getMyNursesRows', () => {
    it('should return an observable of nurse rows', () => {
      const medicalOfficeId = '1234';
      const expectedNurseRows = [
        {
          imageUrl: 'http://example.com/nurse1.jpg',
          firstName: 'Alice',
          lastName: 'Smith',
          email: 'alice.smith@example.com'
        },
        {
          imageUrl: 'http://example.com/nurse2.jpg',
          firstName: 'Bob',
          lastName: 'Johnson',
          email: 'bob.johnson@example.com'
        }
      ];
  
      const mockNurses = [
        { id: '1', firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com' },
        { id: '2', firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' }
      ];
  
      const mockImageUrls = [
        'http://example.com/nurse1.jpg',
        'http://example.com/nurse2.jpg'
      ];
  
      httpClientSpy.get.and.returnValue(of(mockNurses));
      imageServiceSpy.getImageUrlByUserId.and.returnValues(of(mockImageUrls[0]), of(mockImageUrls[1]));
  
      myNursesService.getMyNursesRows(medicalOfficeId).subscribe((nurseRows) => {
        expect(nurseRows).toEqual(expectedNurseRows);
      });
  
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toEqual(`${environment.apiUrl}/api/v1/nurses/offices/${medicalOfficeId}`);
  
      expect(imageServiceSpy.getImageUrlByUserId.calls.count()).toBe(2);
      expect(imageServiceSpy.getImageUrlByUserId.calls.argsFor(0)).toEqual([mockNurses[0].id]);
      expect(imageServiceSpy.getImageUrlByUserId.calls.argsFor(1)).toEqual([mockNurses[1].id]);
    });
  });















});

