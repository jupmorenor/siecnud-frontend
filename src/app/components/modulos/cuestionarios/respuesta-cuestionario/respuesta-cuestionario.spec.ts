import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaCuestionario } from './respuesta-cuestionario';

describe('RespuestaCuestionario', () => {
  let component: RespuestaCuestionario;
  let fixture: ComponentFixture<RespuestaCuestionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaCuestionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespuestaCuestionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
