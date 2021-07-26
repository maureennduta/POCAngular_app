import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  name: string = '';
  patients: any;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private patientService: PatientsService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu:[2,5,10,15],
      dom: 'lrtip'
    };
    this.fetchAllPatients();

  }
  fetchAllPatients(): void {
    this.patientService.fetchPatient().subscribe(
      (patients) => {
        this.patients = patients;
        console.log(patients);
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
}
