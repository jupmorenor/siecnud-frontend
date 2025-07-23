import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInstitucion } from './form-institucion';

describe('FormInstitucion', () => {
  let component: FormInstitucion;
  let fixture: ComponentFixture<FormInstitucion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInstitucion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInstitucion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
