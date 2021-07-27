import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTablesModule } from 'angular-datatables';

import { HivnegativePatientsComponent } from './hivnegative-patients.component';

describe('HivnegativePatientsComponent', () => {
  let component: HivnegativePatientsComponent;
  let fixture: ComponentFixture<HivnegativePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivnegativePatientsComponent ],
      imports:[DataTablesModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HivnegativePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
