import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormContacto } from "../../formularios/form-contacto/form-contacto";
import { FormPerfil } from "../../formularios/form-perfil/form-perfil";
import { FormPerfilDocente } from "../../formularios/form-perfil-docente/form-perfil-docente";
import { Alerts } from '../../../services/alerts';

@Component({
  selector: 'app-perfil',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormContacto,
    FormPerfil,
    FormPerfilDocente
],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

  usuarioId: number = 0;
  cambiarContrasena: boolean = false;

  passform: FormGroup;
  formBuilder = inject(FormBuilder);
  alert = inject(Alerts);

  constructor() {
    this.passform = this.formBuilder.group({
      contrasenaActual: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmarContrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get contrasenaActual(): AbstractControl {
    return this.passform.get('contrasenaActual') as AbstractControl;
  }

  get nuevaContrasena(): AbstractControl {
    return this.passform.get('nuevaContrasena') as AbstractControl;
  }

  get confirmarContrasena(): AbstractControl {
    return this.passform.get('confirmarContrasena') as AbstractControl;
  }

  onPassChange() {
    const errs1 = this.nuevaContrasena.errors;
    const errs2 = this.confirmarContrasena.errors;
    if (this.nuevaContrasena.value !== this.confirmarContrasena.value) {
      this.nuevaContrasena.setErrors({...errs1, no_coinciden: true });
      this.confirmarContrasena.setErrors({...errs2, no_coinciden: true });
    } else {
      if (this.nuevaContrasena.hasError('no_coinciden')) {
        this.nuevaContrasena.setErrors(null);
      } else {
        this.nuevaContrasena.setErrors(errs1);
      }
      if (this.confirmarContrasena.hasError('no_coinciden')) {
        this.confirmarContrasena.setErrors(null);
      } else {
        this.confirmarContrasena.setErrors(errs2);
      }

    }
  }

  guardar() {
    this.alert.confirm().then((result) => {
      if (result.isConfirmed) {
        // Aquí se llamaría al servicio para cambiar la contraseña
        this.alert.success().then(() => {
          this.cancelar();
        });
      }
    });
  }

  cancelar() {
    this.cambiarContrasena = false;
    this.passform.reset();
  }

}
