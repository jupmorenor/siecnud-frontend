import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDocentes } from './modal-docentes';

describe('ModalDocentes', () => {
  let component: ModalDocentes;
  let fixture: ComponentFixture<ModalDocentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDocentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDocentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
