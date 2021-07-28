import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8000/api';
@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  //hiv monthly report
  getHivMonthlyReport(month:number): Observable<any> {
    return this.httpClient.get(`${baseURL}/hivreport/${month}`);
  }

  //hiv positive patients list
  getHivPositivePatients(location:number,month:number): Observable<any>{
    return this.httpClient.get(`${baseURL}/positivepatientlist/${location}/${month}`)
  }

  //hiv negative patients list
  getHivNegativePatients(location:number,month:number):Observable<any>{
    return this.httpClient.get(`${baseURL}/negativepatientlist/${location}/${month}`)
  }
}
