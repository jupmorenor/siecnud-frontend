import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoInstituciones } from './listado-instituciones';

describe('ListadoInstituciones', () => {
  let component: ListadoInstituciones;
  let fixture: ComponentFixture<ListadoInstituciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoInstituciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoInstituciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
