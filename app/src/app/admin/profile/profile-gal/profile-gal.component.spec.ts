import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileGalComponent } from './profile-gal.component';

describe('ProfileGalComponent', () => {
  let component: ProfileGalComponent;
  let fixture: ComponentFixture<ProfileGalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileGalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileGalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
