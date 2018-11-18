import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCampaignPatientComponent } from './doctor-campaign-patient.component';

describe('DoctorCampaignPatientComponent', () => {
  let component: DoctorCampaignPatientComponent;
  let fixture: ComponentFixture<DoctorCampaignPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCampaignPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCampaignPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
