import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  name: string = '';
  patients: any[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  selectedPatient: any;

  constructor(private patientService: PatientsService,private modalService:NgbModal) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [2, 5, 10, 15],
      dom: 'lrtip',
      destroy: true,
    };
    this.fetchPatientByName(this.name);
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  selectPatient(patient: any[], content: any) {
    this.selectedPatient = patient;
    console.log(this.selectedPatient);
    this.modalService.open(content,{ size: 'lg' })
  }
  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.dtTrigger.next();
  //   });
  // }
}
