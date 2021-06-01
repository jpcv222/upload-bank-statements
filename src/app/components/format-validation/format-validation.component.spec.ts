import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatValidationComponent } from './format-validation.component';

describe('FormatValidationComponent', () => {
  let component: FormatValidationComponent;
  let fixture: ComponentFixture<FormatValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
