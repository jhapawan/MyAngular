import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpadateUserComponent } from './upadate-user.component';

describe('UpadateUserComponent', () => {
  let component: UpadateUserComponent;
  let fixture: ComponentFixture<UpadateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpadateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpadateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
