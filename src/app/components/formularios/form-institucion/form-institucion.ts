import { Component, inject, OnInit, input, output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Institucion } from '../../../models/Institucion';
import { Alerts } from '../../../services/alerts/alerts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-institucion',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './form-institucion.html',
  styleUrl: './form-institucion.css'
})
export class FormInstitucion implements OnInit, OnChanges {

  protected router = inject(Router);
  protected formBuilder = inject(FormBuilder);
  protected alert = inject(Alerts);
  institucionId = input<number>(-1);
  veredicto = output<string>();

  protected departamentos: Array<any> = [];
  protected municipios: Array<any> = [];
  protected localidades: Array<any> = [];
  protected upzs: Array<any> = [];

  protected datosInstitucion: FormGroup;

  constructor() {
    this.datosInstitucion = this.formBuilder.group({
      institucion: this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        tipo: ['', [Validators.required]],
        caracter: ['', [Validators.required]],
        direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
        departamento_id: ['', [Validators.required]],
        municipio_id: ['', [Validators.required]],
        direccion_local_id: [''],
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

  ngOnChanges(changes: SimpleChanges) {
    const institucionId = changes['institucionId']?.currentValue;
    if (institucionId >= 0) {
      this.datosInstitucion.setValue({
        institucion: {
          nombre: 'Institución ' + institucionId,
          tipo: 'IES',
          caracter: 'publica',
          direccion: 'Calle 1 2 3',
          departamento_id: '05',
          municipio_id: '009',
          direccion_local_id: '002',
          upz_id: '003'
        },
        representante: {
          nombre: 'Representante ' + institucionId,
          cargo: 'Rector',
          correo: 'correo@institucion' + institucionId + '.edu.co',
          telefonos: ['1234567890']
        }
      })
      this.datosInstitucion.disable();
    } else {
      this.datosInstitucion.enable();
    }
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
    this.datosInstitucion.get('municipio')?.reset('');
    this.datosInstitucion.get('direccion_local_id')?.reset('');
    this.datosInstitucion.get('upz')?.reset('');
  }

  seleccionarMunicipio(event: any) {
    const localList = [
      { id: '001', nombre: 'Localidad 1', municipio: '009' },
      { id: '002', nombre: 'Localidad 2', municipio: '009' },
      { id: '003', nombre: 'Localidad 3', municipio: '009' },
      { id: '004', nombre: 'Localidad 4', municipio: '009' },
      { id: '005', nombre: 'Localidad 5', municipio: '009' },
    ];
    this.localidades = localList.filter(l => l.municipio === event.value);
    this.datosInstitucion.get('direccion_local_id')?.reset('');
    this.datosInstitucion.get('upz_id')?.reset('');
  }

  seleccionarLocalidad(event: any) {
    const upzList = [
      { id: '001', nombre: 'UPZ 1', direccion_local_id: '001' },
      { id: '002', nombre: 'UPZ 2', direccion_local_id: '001' },
      { id: '003', nombre: 'UPZ 3', direccion_local_id: '002' },
      { id: '004', nombre: 'UPZ 4', direccion_local_id: '002' },
      { id: '005', nombre: 'UPZ 5', direccion_local_id: '003' },
      { id: '006', nombre: 'UPZ 6', direccion_local_id: '003' },
      { id: '007', nombre: 'UPZ 7', direccion_local_id: '004' },
      { id: '008', nombre: 'UPZ 8', direccion_local_id: '004' },
      { id: '009', nombre: 'UPZ 9', direccion_local_id: '005' },
      { id: '010', nombre: 'UPZ 10', direccion_local_id: '005' }
    ];
    this.upzs = upzList.filter(u => u.direccion_local_id === event.value);
    this.datosInstitucion.get('upz_id')?.reset('');
  }

  registrarInstitucion() {
    if (this.datosInstitucion.valid) {
      this.alert.confirm().then(result => {
        if (result.isConfirmed) {
          // Aquí se puede enviar la institución a un servicio o API
          const institucion: Institucion = this.datosInstitucion.value.institucion;
          const representante = this.datosInstitucion.value.representante;
          console.log('Institución registrada:', institucion, representante);
          this.alert.success().then(() => {
            this.router.navigate(['/']);
          });
        }
      });
    } else {
      console.error('Formulario inválido');
    }
  }

}
