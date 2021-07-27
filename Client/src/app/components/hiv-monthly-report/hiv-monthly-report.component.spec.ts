import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivMonthlyReportComponent } from './hiv-monthly-report.component';

describe('HivMonthlyReportComponent', () => {
  let component: HivMonthlyReportComponent;
  let fixture: ComponentFixture<HivMonthlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivMonthlyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HivMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
