import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  CustomActionEvent,
  IColumns
} from 'angular2-smart-table';
import { ListadoInstituciones } from "../listado-instituciones/listado-instituciones";
import { TableSettingsWithAdd2 } from '../../models/TableSettings';
import { Institucion } from '../../models/Institucion';

@Component({
  selector: 'app-cursos',
  imports: [
    MatCardModule,
    Angular2SmartTableModule,
    ListadoInstituciones,
  ],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos {

  protected settings: Settings;
  protected cursos: LocalDataSource;
  protected institucion: Institucion | null = null;

  constructor() {
    const columnas: IColumns = {
      id: {
        title: 'ID',
        type: 'text',
        width: '5%',
      },
      nombre: {
        title: 'Nombre del Curso',
        type: 'text',
      }
    };
    this.settings = {
      ...TableSettingsWithAdd2,
      columns: columnas
    };
    this.cursos = new LocalDataSource();
  }

  cargarCursos(): void {
    // Cargar cursos con la institucion seleccionada
    if (this.institucion !== null) {
      this.cursos.load([
        { id: 1, nombre: 'Curso A' },
        { id: 2, nombre: 'Curso B' },
        { id: 3, nombre: 'Curso C' },
        { id: 4, nombre: 'Curso D' },
      ]);
    }
  }

  institucionSelected(institucion: Institucion) {
    this.institucion = institucion;
    this.cargarCursos();
  }

  agregarCurso() {
    console.log('Agregar nuevo curso');
  }

  eventoCursos(event: CustomActionEvent) {
    switch (event.action) {
      case 'asignar':
        console.log('Asignar docente al curso', event.data);
        break;
      case 'registrar':
        console.log('Registrar estudiantes en el curso', event.data);
        break;
      case 'cerrar':
        console.log('Cerrar curso', event.data);
        break;
    }
  }

}
