import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Alerts } from '../../../services/alerts';

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
export class FormContacto implements OnChanges {

  protected formBuilder = inject(FormBuilder);
  protected alert = inject(Alerts);
  protected datosContacto: FormGroup;

  usuarioId = input<number>(-1);
  modificable = input<boolean>(true);

  constructor() {
    this.datosContacto = this.formBuilder.group({
      telefonos: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
      ])
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const usuarioId = changes['usuarioId']?.currentValue;
    if (usuarioId >= 0) {
      // Aquí podrías cargar los datos de contacto si es necesario
      // Crear un control por cada telefono adicional antes de cargar los datos
      this.datosContacto.patchValue({
        telefonos: ['1234567890', '9876543210']
      });
      this.datosContacto.disable();
    } else {
      this.datosContacto.reset();
      this.datosContacto.enable();
    }
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

  activarFormulario() {
    this.datosContacto.enable();
  }

  guardarDatos() {
    this.alert.confirm().then((result) => {
      if (result.isConfirmed) {
        console.log('Datos guardados:', this.datosContacto.value);
        this.alert.success().then(() => {
          this.datosContacto.disable();
        });
      }
    });
  }

}
