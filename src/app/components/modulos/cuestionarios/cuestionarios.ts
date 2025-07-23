import { Component } from '@angular/core';
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
import { TableSettings } from '../../../models/TableSettings';
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

  protected institucion: Institucion | null = null;
  protected curso: Curso | null = null;

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
      ...TableSettings,
      columns: columnas
    };
    this.cuestionarios = new LocalDataSource();
  }

  cargarCuestionarios(): void {
    // Cargar cuestionarios con la institucion y curso seleccionados
    if (this.institucion !== null && this.curso !== null) {
      this.cuestionarios.load([
        { id: 1, nombre: 'Cuestionario A', estado: 'Activo', fecha_limite: '2023-12-31' },
        { id: 2, nombre: 'Cuestionario B', estado: 'Inactivo', fecha_limite: '2024-01-15' },
        { id: 3, nombre: 'Cuestionario C', estado: 'Activo', fecha_limite: '2024-02-20' },
        { id: 4, nombre: 'Cuestionario D', estado: 'Inactivo', fecha_limite: '2024-03-10' },
      ]);
    }
  }

  institucionSelected(institucion: Institucion) {
    this.institucion = institucion;
  }

  cursoSelected(curso: Curso) {
    this.curso = curso;
    this.cargarCuestionarios();
  }

  agregarCuestionario() {
    console.log('Agregar nuevo cuestionario');
  }

  eventoCuestionarios(event: CustomActionEvent) {
    switch (event.action) {
      case 'editar':
        console.log('Editar cuestionario', event.data);
        break;
      case 'eliminar':
        console.log('Eliminar cuestionario', event.data);
        break;
      case 'verResultados':
        console.log('Ver resultados del cuestionario', event.data);
        break;
    }
  }



}
