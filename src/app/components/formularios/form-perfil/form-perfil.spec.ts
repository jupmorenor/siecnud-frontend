import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfil } from './form-perfil';

describe('FormPerfil', () => {
  let component: FormPerfil;
  let fixture: ComponentFixture<FormPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
