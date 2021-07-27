import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  // name: string = '';
  patients: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private patientService: PatientsService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [2, 5, 10, 15],
      dom: 'lrtip',
      destroy: true,
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  fetchPatientByName(name: string): void {
    this.patientService.fetchPatientByName(name).subscribe(
      (patients) => {
        this.patients = patients;
        // console.log(patients);
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
