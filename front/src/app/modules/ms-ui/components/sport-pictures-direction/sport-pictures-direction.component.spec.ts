import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPicturesDirectionComponent } from './sport-pictures-direction.component';

describe('SportPicturesDirectionComponent', () => {
  let component: SportPicturesDirectionComponent;
  let fixture: ComponentFixture<SportPicturesDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportPicturesDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportPicturesDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
