import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HivnegativePatientsComponent } from './hivnegative-patients.component';

describe('HivnegativePatientsComponent', () => {
  let component: HivnegativePatientsComponent;
  let fixture: ComponentFixture<HivnegativePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HivnegativePatientsComponent ]
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
