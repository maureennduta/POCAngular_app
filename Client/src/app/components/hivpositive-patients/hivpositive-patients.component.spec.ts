import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivpositivePatientsComponent } from './hivpositive-patients.component';

describe('HivpositivePatientsComponent', () => {
  let component: HivpositivePatientsComponent;
  let fixture: ComponentFixture<HivpositivePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivpositivePatientsComponent ]
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
