import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
    MatDatepickerModule,
    MallaConceptual
  ],
  templateUrl: './detalle-cuestionario.html',
  styleUrl: './detalle-cuestionario.css'
})
export class DetalleCuestionario {

  protected listadoConceptos: Array<any> = [];
  protected minDate: Date = new Date();

  protected cuestionario: FormGroup;
  protected preguntas: FormArray;
  protected actividades: FormArray;

  protected formBuilder = inject(FormBuilder);
  
  constructor() {
    this.preguntas = this.formBuilder.array([
      this.formBuilder.group({
        enunciado: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        conceptos: [[], [Validators.required]]
      }),
    ]);
    this.actividades = this.formBuilder.array([
      this.formBuilder.group({
        actividad: ['', [Validators.required]]
      })
    ]);
    this.cuestionario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      fecha_limite: ['', Validators.required],
      preguntas: this.preguntas,
      actividades: this.actividades
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

  agregarActividad() {
    this.actividades.push(
      this.formBuilder.group({
        actividad: ['', [Validators.required]]
      })
    );
  }

  eliminarActividad(index: number) {
    this.actividades.removeAt(index);
  }

  actualizarConceptos(conceptos: any[]) {
    this.listadoConceptos = conceptos;
  }

  guardar() {
    console.log(this.cuestionario.value);
  }

}
