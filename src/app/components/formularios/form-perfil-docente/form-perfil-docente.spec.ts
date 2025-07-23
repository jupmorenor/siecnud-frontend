import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPerfilDocente } from './form-perfil-docente';

describe('FormPerfilDocente', () => {
  let component: FormPerfilDocente;
  let fixture: ComponentFixture<FormPerfilDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPerfilDocente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPerfilDocente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
