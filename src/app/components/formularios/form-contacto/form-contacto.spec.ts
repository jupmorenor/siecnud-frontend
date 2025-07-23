import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContacto } from './form-contacto';

describe('FormContacto', () => {
  let component: FormContacto;
  let fixture: ComponentFixture<FormContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
