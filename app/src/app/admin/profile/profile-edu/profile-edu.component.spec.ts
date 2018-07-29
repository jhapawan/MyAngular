import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEduComponent } from './profile-edu.component';

describe('ProfileEduComponent', () => {
  let component: ProfileEduComponent;
  let fixture: ComponentFixture<ProfileEduComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEduComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
