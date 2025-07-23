import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
  providers: [provideNativeDateAdapter()],
  templateUrl: './form-perfil.html',
  styleUrl: './form-perfil.css'
})
export class FormPerfil {

  protected formBuilder = inject(FormBuilder);
  protected datosPerfil: FormGroup;

  usuarioId = input<number>();

  constructor() {
    this.datosPerfil = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]]
    });
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

  
}
