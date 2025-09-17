import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MallaConceptual } from '../malla-conceptual/malla-conceptual';


@Component({
  selector: 'app-detalle-cuestionario',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MallaConceptual
  ],
  templateUrl: './detalle-cuestionario.html',
  styleUrl: './detalle-cuestionario.css'
})
export class DetalleCuestionario {

  protected listadoConceptos: Array<any> = [];

  protected cuestionario: FormGroup;
  protected preguntas: FormArray;

  protected formBuilder = inject(FormBuilder);
  
  constructor() {
    this.preguntas = this.formBuilder.array([
      this.formBuilder.group({
        enunciado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        conceptos: [[], [Validators.required]]
      }),
    ]);
    this.cuestionario = this.formBuilder.group({
      preguntas: this.preguntas
    });
    
  }

  agregarPregunta() {
    this.preguntas.push(
      this.formBuilder.group({
        enunciado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        conceptos: [[], [Validators.required]]
      })
    );
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  actualizarConceptos(conceptos: any[]) {
    this.listadoConceptos = conceptos;
  }

  guardar() {
    console.log(this.cuestionario.value);
  }

}
