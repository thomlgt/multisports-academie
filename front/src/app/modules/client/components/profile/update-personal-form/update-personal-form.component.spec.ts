import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonalFormComponent } from './update-personal-form.component';

describe('UpdatePersonalFormComponent', () => {
  let component: UpdatePersonalFormComponent;
  let fixture: ComponentFixture<UpdatePersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePersonalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
