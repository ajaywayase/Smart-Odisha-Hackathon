import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcrAddCampaignComponent } from './fcr-add-campaign.component';

describe('FcrAddCampaignComponent', () => {
  let component: FcrAddCampaignComponent;
  let fixture: ComponentFixture<FcrAddCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcrAddCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcrAddCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
