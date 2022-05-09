import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminCaptainComponent } from './display-admin-captain.component';

describe('DisplayAdminCaptainComponent', () => {
  let component: DisplayAdminCaptainComponent;
  let fixture: ComponentFixture<DisplayAdminCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminCaptainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAdminCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
