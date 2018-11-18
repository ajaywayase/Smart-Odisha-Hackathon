import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FCRComponent } from './fcr.component';

describe('FCRComponent', () => {
  let component: FCRComponent;
  let fixture: ComponentFixture<FCRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FCRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FCRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
