import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAdminEventComponent } from './display-admin-event.component';

describe('DisplayAdminEventComponent', () => {
  let component: DisplayAdminEventComponent;
  let fixture: ComponentFixture<DisplayAdminEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAdminEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAdminEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
