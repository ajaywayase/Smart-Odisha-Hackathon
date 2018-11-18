import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCampaignsComponent } from './doctor-campaigns.component';

describe('DoctorCampaignsComponent', () => {
  let component: DoctorCampaignsComponent;
  let fixture: ComponentFixture<DoctorCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
