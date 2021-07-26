import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "patient_list"},
  {path: "patient_list", component: PatientListComponent},
  {path: "patient_details", component: PatientDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
