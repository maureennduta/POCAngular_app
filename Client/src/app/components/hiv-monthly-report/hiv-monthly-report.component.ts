import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';

const months = [
  { monthID: '1', month: 'January' },
  { monthID: '2', month: 'February' },
  { monthID: '3', month: 'March' },
  { monthID: '4', month: 'April' },
  { monthID: '5', month: 'May' },
  { monthID: '6', month: 'June' },
  { monthID: '7', month: 'July' },
  { monthID: '8', month: 'August' },
  { monthID: '9', month: 'September' },
  { monthID: '10', month: 'October' },
  { monthID: '11', month: 'November' },
  { monthID: '12', month: 'December' },
];
@Component({
  selector: 'app-hiv-monthly-report',
  templateUrl: './hiv-monthly-report.component.html',
  styleUrls: ['./hiv-monthly-report.component.css'],
})
export class HivMonthlyReportComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  selectedMonth!: number;
  hivData: any[] = [];
  encounterMonths: any[] = months;
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private reportService: ReportsService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [2, 5, 10, 15],
      dom: 'lrtip',
      destroy: true,
    };
  }

  hivMonthlyData(): void {
    this.reportService.getHivMonthlyReport(this.selectedMonth).subscribe(
      (data) => {
        this.hivData = data;
        this.dtTrigger.next();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange(event: any) {
    this.selectedMonth = event;
    this.dtTrigger.unsubscribe();
    this.hivMonthlyData();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
