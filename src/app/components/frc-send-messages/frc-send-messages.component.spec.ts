import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrcSendMessagesComponent } from './frc-send-messages.component';

describe('FrcSendMessagesComponent', () => {
  let component: FrcSendMessagesComponent;
  let fixture: ComponentFixture<FrcSendMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrcSendMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrcSendMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
