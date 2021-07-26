import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8000/api/';
@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private httpClient :HttpClient) {}

  fetchPatient(): Observable<any>{
    return this.httpClient.get(`${baseURL}patients`);
  }

  
}
