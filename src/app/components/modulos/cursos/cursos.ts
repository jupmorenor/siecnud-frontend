import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  CustomActionEvent,
  IColumns
} from 'angular2-smart-table';
import { ListadoInstituciones } from "../../otros/listado-instituciones/listado-instituciones";
import { TableSettingsWithAdd2 } from '../../../models/TableSettings';
import { Institucion } from '../../../models/Institucion';
import { Alerts } from '../../../services/alerts/alerts';
import { ModalDocentes } from './modal-docentes/modal-docentes';
import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-cursos',
  imports: [
    MatCardModule,
    MatDialogModule,
    Angular2SmartTableModule,
    ListadoInstituciones,
  ],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos {

  protected alert = inject(Alerts);
  protected dialog = inject(MatDialog);

  protected settings: Settings;
  protected cursos: LocalDataSource;
  protected institucion = signal<Institucion | null>(null);

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
    if (this.institucion() !== null) {
      this.cursos.load([
        { id: 1, nombre: 'Curso A' },
        { id: 2, nombre: 'Curso B' },
        { id: 3, nombre: 'Curso C' },
        { id: 4, nombre: 'Curso D' },
      ]);
    }
  }

  institucionSelected(institucion: Institucion) {
    this.institucion.set(institucion);
    this.cargarCursos();
  }

  agregarCurso() {
    this.alert.nuevoCurso().then((result) => {
      if (result.isConfirmed && result.value) {
        const nuevoCurso = { id: this.cursos.count() + 1, nombre: result.value };
        this.cursos.add(nuevoCurso);
        this.alert.success().then(() => {
          this.cursos.refresh();
          console.log('Curso agregado:', nuevoCurso);
        });
      }
    });
  }

  eventoCursos(event: CustomActionEvent) {
    switch (event.action) {
      case 'asignar':
        const dialog = this.dialog.open(ModalDocentes, {
          data: {
            curso: event.data as Curso,
            institucion: this.institucion()
          },
          maxWidth: '1200px',
          maxHeight: '800px',
          width: '1200px',
          height: '450px',
        });
        dialog.afterClosed().subscribe(result => {
          if (result) {
            // Agregar tipos correctos
            console.log('Docente asignado:', result);
          }
        });
        break;
      case 'registrar':
        this.alert.cargarArchivo().then((result) => {
          if (result.isConfirmed && result.value) {
            console.log('Registrar estudiantes en el curso', result.value);
          }
        });
        break;
      case 'cerrar':
        this.alert.confirm(true).then((result) => {
          if (result.isConfirmed) {
            console.log('Curso cerrado', event.data);
            this.cursos.remove(event.data);
          }
        });
        break;
    }
  }

}
