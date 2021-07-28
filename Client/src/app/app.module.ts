import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PatientsService } from './services/patients.service';
import {  HttpClientModule } from '@angular/common/http';
import { HivMonthlyReportComponent } from './components/hiv-monthly-report/hiv-monthly-report.component';
import { HivpositivePatientsComponent } from './components/hivpositive-patients/hivpositive-patients.component';
import { HivnegativePatientsComponent } from './components/hivnegative-patients/hivnegative-patients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PatientListComponent,
    PatientDetailsComponent,
    HivMonthlyReportComponent,
    HivpositivePatientsComponent,
    HivnegativePatientsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    NgbModule 
  ],
  providers: [PatientsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
