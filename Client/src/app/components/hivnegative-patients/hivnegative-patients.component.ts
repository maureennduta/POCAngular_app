import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-hivnegative-patients',
  templateUrl: './hivnegative-patients.component.html',
  styleUrls: ['./hivnegative-patients.component.css']
})
export class HivnegativePatientsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  location!: any;
  encounterMonth!: any;
  hivData: any[] = [];
  sub!: any;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [2, 5, 10, 15],
      dom: 'lrtip',
      destroy: true,
    };
    this.sub = this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.location = params.get('location');
      this.encounterMonth=params.get('month');
    });

    this.hivNegativePatientsData();
  }

  hivNegativePatientsData(): void {
    this.reportService.getHivNegativePatients(this.location,this.encounterMonth).subscribe(
      (data) => {
        this.hivData = data;
        this.dtTrigger.next();
        console.log(this.hivData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
