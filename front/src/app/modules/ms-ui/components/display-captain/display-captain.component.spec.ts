import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCaptainComponent } from './display-captain.component';

describe('DisplayCaptainComponent', () => {
  let component: DisplayCaptainComponent;
  let fixture: ComponentFixture<DisplayCaptainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCaptainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCaptainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
