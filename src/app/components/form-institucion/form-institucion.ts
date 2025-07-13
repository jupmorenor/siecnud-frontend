import { Component, inject, OnInit, input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { Institucion } from '../../models/Institucion';

@Component({
  selector: 'app-form-institucion',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule
  ],
  templateUrl: './form-institucion.html',
  styleUrl: './form-institucion.css'
})
export class FormInstitucion implements OnInit {

  protected formBuilder = inject(FormBuilder);
  institucionId = input<number>();

  protected departamentos: Array<any> = [];
  protected municipios: Array<any> = [];
  protected upzs: Array<any> = [];

  protected datosInstitucion: FormGroup;

  constructor() {
    this.datosInstitucion = this.formBuilder.group({
      institucion: this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        tipo: ['', [Validators.required]],
        caracter: ['', [Validators.required]],
        direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        municipio_id: ['', [Validators.required]],
        upz_id: ['']
      }),
      representante: this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        cargo: ['', [Validators.required]],
        correo: ['', [Validators.required, Validators.email]],
        telefonos: this.formBuilder.array([
          this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        ]),
      }),
    });
  }

  ngOnInit() {
    this.departamentos = [
      { id: '01', nombre: 'Amazonas' },
      { id: '02', nombre: 'Antioquia' },
      { id: '03', nombre: 'Arauca' },
      { id: '04', nombre: 'Atlántico' },
      { id: '05', nombre: 'Bolívar' },
      { id: '06', nombre: 'Boyacá' },
      { id: '07', nombre: 'Caldas' },
      { id: '08', nombre: 'Caquetá' },
      { id: '09', nombre: 'Casanare' },
      { id: '10', nombre: 'Cauca' },
      { id: '11', nombre: 'Cesar' },
      { id: '12', nombre: 'Chocó' },
      { id: '13', nombre: 'Córdoba' },
      { id: '14', nombre: 'Cundinamarca' },
      { id: '15', nombre: 'Guainía' },
      { id: '16', nombre: 'Guaviare' },
      { id: '17', nombre: 'Huila' },
      { id: '18', nombre: 'La Guajira' },
      { id: '19', nombre: 'Magdalena' },
      { id: '20', nombre: 'Meta' },
      { id: '21', nombre: 'Nariño' },
      { id: '22', nombre: 'Norte de Santander' },
      { id: '23', nombre: 'Putumayo' },
      { id: '24', nombre: 'Quindío' },
      { id: '25', nombre: 'Risaralda' },
      { id: '26', nombre: 'San Andrés y Providencia' },
      { id: '27', nombre: 'Santander' },
      { id: '28', nombre: 'Sucre' },
      { id: '29', nombre: 'Tolima' },
      { id: '30', nombre: 'Valle del Cauca' },
      { id: '31', nombre: "Vaupés" },
      { id: "32", nombre:"Vichada" }
    ];
  }

  get nombre() {
    return this.datosInstitucion.get('institucion')?.get('nombre');
  }

  get direccion() {
    return this.datosInstitucion.get('institucion')?.get('direccion');
  }

  get institucion() {
    return this.datosInstitucion.get('institucion');
  }

  get representante() {
    return this.datosInstitucion.get('representante');
  }

  get telefonos() {
    return this.datosInstitucion.get('representante')?.get('telefonos') as FormArray;
  }

  agregarTelefono() {
    if (this.telefonos) {
      this.telefonos.push(this.formBuilder.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]));
    }
  }

  eliminarTelefono(index: number) {
    console.log('Eliminar teléfono en el índice:', index);
    this.telefonos.removeAt(index);
  }

  seleccionarDepartamento(event: any) {
    const munip = [
      { id: '001', nombre: 'Leticia', departamento: '01' },
      { id: '002', nombre: 'Puerto Nariño', departamento: '01' },
      { id: '003', nombre: 'Medellín', departamento: '02' },
      { id: '004', nombre: 'Bello', departamento: '02' },
      { id: '005', nombre: 'Arauca', departamento: '03' },
      { id: '006', nombre: 'Tame', departamento: '03' },
      { id: '007', nombre: 'Barranquilla', departamento: '04' },
      { id: '008', nombre: 'Soledad', departamento: '04' },
      { id: '009', nombre: 'Bogotá', departamento: '05' },
    ]
    this.municipios = munip.filter(m => m.departamento === event.value);
    this.upzs = [];
    this.datosInstitucion.get('municipio')?.setValue('');
    this.datosInstitucion.get('upz')?.setValue('');
  }

  seleccionarMunicipio(event: any) {
    const upzList = [
      { id: '001', nombre: 'UPZ 1', municipio: '009' },
      { id: '002', nombre: 'UPZ 2', municipio: '009' },
      { id: '003', nombre: 'UPZ 3', municipio: '009' },
      { id: '004', nombre: 'UPZ 4', municipio: '009' },
      { id: '005', nombre: 'UPZ 5', municipio: '009' },
    ];
    this.upzs = upzList.filter(u => u.municipio === event.value);
    this.datosInstitucion.get('upz_id')?.setValue('');
  }

  registrarInstitucion() {
    if (this.datosInstitucion.valid) {
      const institucion: Institucion = this.datosInstitucion.value.institucion;
      const telefonos = this.datosInstitucion.value.telefonos;
      const representante = this.datosInstitucion.value.representante;

      // Aquí se puede enviar la institución a un servicio o API
      console.log('Institución registrada:', institucion, representante);
    } else {
      console.error('Formulario inválido');
    }
  }

}
