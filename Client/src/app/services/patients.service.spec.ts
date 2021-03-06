import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { PatientsService } from './patients.service';

describe('PatientsService', () => {
  let service: PatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(PatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it(`should create`, async(inject([HttpTestingController, ApiService],
  //   (httpClient: HttpTestingController, apiService: ApiService) => {
  //     expect(apiService).toBeTruthy();
  // })));
});
