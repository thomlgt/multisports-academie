import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolTeamComponent } from './enrol-team.component';

describe('EnrolTeamComponent', () => {
  let component: EnrolTeamComponent;
  let fixture: ComponentFixture<EnrolTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrolTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
