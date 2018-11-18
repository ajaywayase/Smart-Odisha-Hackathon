import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDiseasesInfoComponent } from './user-diseases-info.component';

describe('UserDiseasesInfoComponent', () => {
  let component: UserDiseasesInfoComponent;
  let fixture: ComponentFixture<UserDiseasesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDiseasesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDiseasesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
