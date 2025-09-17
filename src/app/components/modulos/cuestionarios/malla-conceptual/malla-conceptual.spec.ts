import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MallaConceptual } from './malla-conceptual';

describe('MallaConceptual', () => {
  let component: MallaConceptual;
  let fixture: ComponentFixture<MallaConceptual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MallaConceptual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MallaConceptual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
