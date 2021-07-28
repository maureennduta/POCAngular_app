import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HivMonthlyReportComponent } from './components/hiv-monthly-report/hiv-monthly-report.component';
import { HivnegativePatientsComponent } from './components/hivnegative-patients/hivnegative-patients.component';
import { HivpositivePatientsComponent } from './components/hivpositive-patients/hivpositive-patients.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "patientlist"},
  {path: "patientlist", component: PatientListComponent},
  {path: "hivreport", component: HivMonthlyReportComponent},
  {path: "positivepatientlist/:location/:month", component: HivpositivePatientsComponent},
  {path: "negativepatientlist/:location/:month", component: HivnegativePatientsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
