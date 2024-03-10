
import { TestBed} from '@angular/core/testing';

import { ActivatedRoute } from "@angular/router";
import { environment } from 'src/environments/environment.development';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfilePageService } from './profile-page.service';
import { AccountService } from './account.service';


describe('ProfilePageService', () => {
  let service: ProfilePageService;
  let httpMock: HttpTestingController;
  let accountService: AccountService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { imageUrl: 'mockImageUrl' } } },
          AccountService }
      ]
    });
    service = TestBed.inject(ProfilePageService);
    httpMock = TestBed.inject(HttpTestingController);
    accountService = TestBed.inject(AccountService);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be create', () => {
    expect(service).toBeTruthy();
  });

});
