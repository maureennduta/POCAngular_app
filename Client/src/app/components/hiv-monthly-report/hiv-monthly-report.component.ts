import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

  DownloadReport() {
    let row: any[] = [];
    let rowD: any[] = [];
    let col = ['Month', 'Location', 'HIV Positive', 'HIV Negative']; // initialization for headers
    let title = 'HIV Monthly'; // title of report
    for (let a = 0; a < this.hivData.length; a++) {
      row.push(this.hivData[a].Month);
      row.push(this.hivData[a].Location);
      row.push(this.hivData[a].Positive);
      row.push(this.hivData[a].Negative);
      rowD.push(row);
      row = [];
    }
    this.getReport(col, rowD, title);
  }
  getReport(col: any[], rowD: any[], title: any) {
    const totalPagesExp = '{total_pages_count_string}';
    let pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(51, 156, 255);
    pdf.text(title, 435, 100); //
    pdf.setLineWidth(1.5);
    pdf.line(5, 107, 995, 107);
    var pageContent = function (data: {
      pageCount: string;
      settings: { margin: { left: any } };
    }) {
      var str = 'Page ' + data.pageCount;
      // Total page number plugin only available in jspdf v1.0+
      if (typeof pdf.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp;
      }
      pdf.setFontSize(10);
      var pageHeight =
        pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
      pdf.text(str, data.settings.margin.left, pageHeight - 10); // showing current page number
    };
    (pdf as any).autoTable(col, rowD, {
      addPageContent: pageContent,
      margin: { top: 110 },
    });

    //for adding total number of pages // i.e 10 etc
    if (typeof pdf.putTotalPages === 'function') {
      pdf.putTotalPages(totalPagesExp);
    }

    pdf.save(title + '.pdf');
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
