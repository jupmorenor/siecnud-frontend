import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCuestionarios } from './lista-cuestionarios';

describe('ListaCuestionarios', () => {
  let component: ListaCuestionarios;
  let fixture: ComponentFixture<ListaCuestionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCuestionarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCuestionarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
