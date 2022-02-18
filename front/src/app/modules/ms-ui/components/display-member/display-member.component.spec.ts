import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMemberComponent } from './display-member.component';

describe('DisplayMemberComponent', () => {
  let component: DisplayMemberComponent;
  let fixture: ComponentFixture<DisplayMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
