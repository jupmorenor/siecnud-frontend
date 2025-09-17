import { Component, signal, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  CustomActionEvent,
  IColumns
} from 'angular2-smart-table';
import { ListadoInstituciones } from "../../otros/listado-instituciones/listado-instituciones";
import { ListadoCursos } from '../../otros/listado-cursos/listado-cursos';
import { TableSettingsWithAdd2, actions4 } from '../../../models/TableSettings';
import { Institucion } from '../../../models/Institucion';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-cuestionarios',
  imports: [
    MatCardModule,
    Angular2SmartTableModule,
    ListadoInstituciones,
    ListadoCursos,
  ],
  templateUrl: './cuestionarios.html',
  styleUrl: './cuestionarios.css'
})
export class Cuestionarios {

  protected settings: Settings;
  protected cuestionarios: LocalDataSource;

  protected router = inject(Router);
  protected route = inject(ActivatedRoute);

  protected institucion = signal<Institucion | null>(null);
  protected curso = signal<Curso | null>(null);

  constructor() {
    const columnas: IColumns = {
      id: {
        title: 'ID',
        type: 'text',
        width: '5%',
      },
      nombre: {
        title: 'Nombre',
        type: 'text',
      },
      estado: {
        title: 'Estado',
        type: 'text',
      },
      fecha_limite: {
        title: 'Fecha Límite',
        type: 'text',
      }
    };
    this.settings = {
      ...TableSettingsWithAdd2,
      columns: columnas,
      actions: actions4,
    };
    this.cuestionarios = new LocalDataSource();
  }

  cargarCuestionarios(): void {
    // Cargar cuestionarios con la institucion y curso seleccionados
    if (this.institucion() !== null && this.curso() !== null) {
      this.cuestionarios.load([
        { id: 1, nombre: 'Cuestionario A', estado: 'Activo', fecha_limite: '2023-12-31' },
        { id: 2, nombre: 'Cuestionario B', estado: 'Inactivo', fecha_limite: '2024-01-15' },
        { id: 3, nombre: 'Cuestionario C', estado: 'Activo', fecha_limite: '2024-02-20' },
        { id: 4, nombre: 'Cuestionario D', estado: 'Inactivo', fecha_limite: '2024-03-10' },
      ]);
    }
  }

  cursoSelected(curso: Curso) {
    this.curso.set(curso);
    this.cargarCuestionarios();
  }

  agregarCuestionario() {
    console.log('Agregar nuevo cuestionario');
    this.router.navigate(['detalle-cuestionario']);
  }

  eventoCuestionarios(event: CustomActionEvent) {
    switch (event.action) {
      case 'ver':
        console.log('Ver detalle del cuestionario', event.data);
        break;
      case 'responder':
        console.log('Responder cuestionario', event.data);
        break;
      case 'validar':
        console.log('Validar cuestionario', event.data);
        break;
      case 'calificar':
        console.log('Calificar cuestionario', event.data);
        break;
      case 'reporte_individual':
        console.log('Ver reporte individual del curso', event.data);
        break;
      case 'reporte_consolidado':
        console.log('Ver reporte consolidado del curso', event.data);
        break;
      case 'cerrar':
        console.log('Cerrar cuestionario', event.data);
        break;
    }
  }
  
}
