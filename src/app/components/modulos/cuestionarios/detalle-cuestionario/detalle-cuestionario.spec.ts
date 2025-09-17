import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCuestionario } from './detalle-cuestionario';

describe('DetalleCuestionario', () => {
  let component: DetalleCuestionario;
  let fixture: ComponentFixture<DetalleCuestionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleCuestionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCuestionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
