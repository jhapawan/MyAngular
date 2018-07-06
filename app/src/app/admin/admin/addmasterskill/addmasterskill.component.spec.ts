import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmasterskillComponent } from './addmasterskill.component';

describe('AddmasterskillComponent', () => {
  let component: AddmasterskillComponent;
  let fixture: ComponentFixture<AddmasterskillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmasterskillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmasterskillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
