import { Component, inject, input, output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Alerts } from '../../../services/alerts/alerts';

@Component({
  selector: 'app-form-perfil',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule
  ],
  templateUrl: './form-perfil.html',
  styleUrl: './form-perfil.css'
})
export class FormPerfil implements OnChanges {

  protected formBuilder = inject(FormBuilder);
  protected alert = inject(Alerts);
  protected datosPerfil: FormGroup;

  usuarioId = input<number>(-1);
  modificable = input<boolean>(true);
  guardado = output<void>();

  constructor() {
    this.datosPerfil = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const usuarioId = changes['usuarioId']?.currentValue;
    if (usuarioId >= 0) {
      // Aquí podrías cargar los datos del perfil del usuario si es necesario
      this.datosPerfil.patchValue({
        nombre: 'Usuario ' + usuarioId,
        correo: 'usuario' + usuarioId + '@ejemplo.com',
        cargo: 'Rector',
        fechaNacimiento: new Date()
      });
      this.datosPerfil.disable();
    } else {
      this.datosPerfil.reset();
      this.datosPerfil.enable();
    }
  }

  get nombre() {
    return this.datosPerfil.get('nombre');
  }

  get correo() {
    return this.datosPerfil.get('correo');
  }

  get cargo() {
    return this.datosPerfil.get('cargo');
  }

  get fechaNacimiento() {
    return this.datosPerfil.get('fechaNacimiento');
  }

  activarFormulario() {
    this.datosPerfil.enable();
  }

  guardarDatos() {
    this.alert.confirm().then((result) => {
      if (result.isConfirmed) {
        console.log('Datos guardados:', this.datosPerfil.value);
        this.alert.success().then(() => {
          if (this.usuarioId() === -1) {
            this.datosPerfil.reset();
            this.guardado.emit();
          } else {
            this.datosPerfil.disable(); 
          }
        });
      }
    });
  }

  
}
