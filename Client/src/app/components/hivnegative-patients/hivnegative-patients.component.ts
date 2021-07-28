import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

  DownloadReport() {
    let row: any[] = [];
    let rowD: any[] = [];
    let col = ['Patient Name', 'EncounterDate', 'Location', 'HIV Status','Gender','Age']; // initialization for headers
    let title = 'HIV Negative Patients '; // title of report
    for (let a = 0; a < this.hivData.length; a++) {
      row.push(this.hivData[a].name);
      row.push(this.hivData[a].encounter_datetime);
      row.push(this.hivData[a].location_id);
      row.push(this.hivData[a].hiv_status);
      row.push(this.hivData[a].gender);
      row.push(this.hivData[a].age);
      rowD.push(row);
      row = [];
    }
    this.getReport(col, rowD, title);
  }
  getReport(col: any[], rowD: any[], title: any) {
    const totalPagesExp = '{total_pages_count_string}';
    let pdf = new jsPDF('l', 'pt', 'legal');
    pdf.setTextColor(51, 156, 255);
    pdf.text(title + 'Report', 435, 100); //
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

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
}
