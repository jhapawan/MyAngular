import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGallaryComponent } from './user-gallary.component';

describe('UserGallaryComponent', () => {
  let component: UserGallaryComponent;
  let fixture: ComponentFixture<UserGallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
