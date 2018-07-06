import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadGalaryComponent } from './load-galary.component';

describe('LoadGalaryComponent', () => {
  let component: LoadGalaryComponent;
  let fixture: ComponentFixture<LoadGalaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadGalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
