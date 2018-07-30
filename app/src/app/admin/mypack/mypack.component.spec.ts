import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypackComponent } from './mypack.component';

describe('MypackComponent', () => {
  let component: MypackComponent;
  let fixture: ComponentFixture<MypackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
