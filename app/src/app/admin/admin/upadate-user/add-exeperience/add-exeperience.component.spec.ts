import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExeperienceComponent } from './add-exeperience.component';

describe('AddExeperienceComponent', () => {
  let component: AddExeperienceComponent;
  let fixture: ComponentFixture<AddExeperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExeperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExeperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
