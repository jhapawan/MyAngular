import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileWorkComponent } from './profile-work.component';

describe('ProfileWorkComponent', () => {
  let component: ProfileWorkComponent;
  let fixture: ComponentFixture<ProfileWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
