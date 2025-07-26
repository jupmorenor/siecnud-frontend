import { Component, inject, input, output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Alerts } from '../../../services/alerts';


@Component({
  selector: 'app-form-perfil-docente',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './form-perfil-docente.html',
  styleUrl: './form-perfil-docente.css'
})
export class FormPerfilDocente implements OnChanges {

  protected formBuilder = inject(FormBuilder);
  protected alert = inject(Alerts);
  protected datosPerfilDocente: FormGroup;

  usuarioId = input<number>(-1);
  modificable = input<boolean>(true);
  guardado = output<void>();

  constructor() {
    this.datosPerfilDocente = this.formBuilder.group({
      alma_mater: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      especializacion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      fecha_grado: ['', [Validators.required]],
      nivel_academico: ['', [Validators.required]],
      reconocimientos: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      ]),
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const usuarioId = changes['usuarioId']?.currentValue;
    if (usuarioId >= 0) {
      // Aquí podrías cargar los datos del perfil del docente si es necesario
      this.datosPerfilDocente.patchValue({
        alma_mater: 'Universidad Ejemplo',
        especializacion: 'Especialización en Educación',
        fecha_grado: new Date('2025-07-13'),
        nivel_academico: 'Posgrado',
        reconocimientos: ['Reconocimiento Ejemplo']
      });
      this.datosPerfilDocente.disable();
    } else {
      this.datosPerfilDocente.reset();
      this.datosPerfilDocente.enable();
    }
  }

  get alma_mater() {
    return this.datosPerfilDocente.get('alma_mater');
  }

  get especializacion() {
    return this.datosPerfilDocente.get('especializacion');
  }

  get fecha_grado() {
    return this.datosPerfilDocente.get('fecha_grado');
  }

  get nivel_academico() {
    return this.datosPerfilDocente.get('nivel_academico');
  }

  get reconocimientos() {
    return this.datosPerfilDocente.get('reconocimientos') as FormArray;
  }

  agregarReconocimiento() {
    this.reconocimientos.push(this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]));
  }

  eliminarReconocimiento(index: number) {
    this.reconocimientos.removeAt(index);
  }

  activarFormulario() {
    this.datosPerfilDocente.enable();
  }

  guardarDatos() {
    this.alert.confirm().then((result) => {
      if (result.isConfirmed) {
        console.log('Datos guardados:', this.datosPerfilDocente.value);
        this.alert.success().then(() => {
          this.datosPerfilDocente.disable();
        });
      }
    });
  }

}
