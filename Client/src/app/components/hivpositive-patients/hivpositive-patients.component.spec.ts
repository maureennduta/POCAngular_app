import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';

import { HivpositivePatientsComponent } from './hivpositive-patients.component';

describe('HivpositivePatientsComponent', () => {
  let component: HivpositivePatientsComponent;
  let fixture: ComponentFixture<HivpositivePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivpositivePatientsComponent ],
      imports:[DataTablesModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HivpositivePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
