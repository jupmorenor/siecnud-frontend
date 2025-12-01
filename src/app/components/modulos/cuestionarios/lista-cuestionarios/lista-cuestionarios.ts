import { Component, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ListadoInstituciones } from "../../../otros/listado-instituciones/listado-instituciones";
import { ListadoCursos } from '../../../otros/listado-cursos/listado-cursos';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  CustomActionEvent,
  IColumns
} from 'angular2-smart-table';
import { TableSettingsWithAdd2, actions4 } from '../../../../models/TableSettings';
import { Institucion } from '../../../../models/Institucion';
import { Curso } from '../../../../models/curso';
import { EventService } from '../../../../services/event/event';

@Component({
  selector: 'app-lista-cuestionarios',
  imports: [ 
    Angular2SmartTableModule,
    MatCardModule,
    ListadoInstituciones,
    ListadoCursos
  ],
  templateUrl: './lista-cuestionarios.html',
  styleUrl: './lista-cuestionarios.css',
})
export class ListaCuestionarios {

  protected institucion = signal<Institucion | null>(null);
  protected curso = signal<Curso | null>(null);

  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected event = inject(EventService);

  protected settings: Settings;
  protected cuestionarios: LocalDataSource;

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

  institucionSelected(institucion: Institucion) {
    this.institucion.set(institucion);
    this.event.institucion.emit(institucion.nombre);
  }

  cursoSelected(curso: Curso) {
    this.curso.set(curso);
    this.event.curso.emit(curso.nombre);
    this.cargarCuestionarios();
  }

  agregarCuestionario() {
    this.router.navigate(['detalle-cuestionario'], { relativeTo: this.route });
  }

  eventoCuestionarios(event: CustomActionEvent) {
    switch (event.action) {
      case 'ver':
        console.log('Ver detalle del cuestionario', event.data);
        break;
      case 'responder':
        this.router.navigate(['responder-cuestionario', event.data.id], { relativeTo: this.route });
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
