import { Injectable } from '@angular/core';

const baseURL = 'http://localhost:8000/patients';
@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor() {}
}
