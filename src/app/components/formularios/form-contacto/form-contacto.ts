import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-contacto',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-contacto.html',
  styleUrl: './form-contacto.css'
})
export class FormContacto {

  protected formBuilder = inject(FormBuilder);
  protected datosContacto: FormGroup;

  constructor() {
    this.datosContacto = this.formBuilder.group({
      telefonos: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
      ])
    })
  }

  get telefonos(): FormArray {
    return this.datosContacto.get('telefonos') as FormArray;
  }

  agregarTelefono() {
    this.telefonos.push(this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]));
  }

  eliminarTelefono(index: number) {
    this.telefonos.removeAt(index);
  }

}
