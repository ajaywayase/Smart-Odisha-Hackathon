import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcrHomeComponent } from './fcr-home.component';

describe('FcrHomeComponent', () => {
  let component: FcrHomeComponent;
  let fixture: ComponentFixture<FcrHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcrHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcrHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
