import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUploadComponent } from './company-upload.component';

describe('FormatValidationComponent', () => {
  let component: CompanyUploadComponent;
  let fixture: ComponentFixture<CompanyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
