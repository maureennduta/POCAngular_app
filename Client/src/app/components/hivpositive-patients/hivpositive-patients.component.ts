import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hivpositive-patients',
  templateUrl: './hivpositive-patients.component.html',
  styleUrls: ['./hivpositive-patients.component.css'],
})
export class HivpositivePatientsComponent implements OnInit {
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

    this.hivPostivePatientsData();
  }

  hivPostivePatientsData(): void {
    this.reportService.getHivPositivePatients(this.location,this.encounterMonth).subscribe(
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
