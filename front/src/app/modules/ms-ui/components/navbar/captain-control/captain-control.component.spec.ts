import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainControlComponent } from './captain-control.component';

describe('CaptainControlComponent', () => {
  let component: CaptainControlComponent;
  let fixture: ComponentFixture<CaptainControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptainControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptainControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
