import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftcontentComponent } from './leftcontent.component';

describe('LeftcontentComponent', () => {
  let component: LeftcontentComponent;
  let fixture: ComponentFixture<LeftcontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftcontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
