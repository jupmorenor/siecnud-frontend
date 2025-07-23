import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


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
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-perfil-docente.html',
  styleUrl: './form-perfil-docente.css'
})
export class FormPerfilDocente {

  protected formBuilder = inject(FormBuilder);
  protected datosPerfilDocente: FormGroup;

  usuarioId = input<number>();

  constructor() {
    this.datosPerfilDocente = this.formBuilder.group({
      institucion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      fechaGrado: ['', [Validators.required]],
      nivelAcademico: ['', [Validators.required]],
      reconocimientos: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)])
      ]),
    })
  }

  get institucion() {
    return this.datosPerfilDocente.get('institucion');
  }

  get titulo() {
    return this.datosPerfilDocente.get('titulo');
  }

  get fechaGrado() {
    return this.datosPerfilDocente.get('fechaGrado');
  }

  get nivelAcademico() {
    return this.datosPerfilDocente.get('nivelAcademico');
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

}
