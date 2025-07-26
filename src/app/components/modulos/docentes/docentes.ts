import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  CustomActionEvent,
  IColumns
} from 'angular2-smart-table';
import { TableSettingsWithAdd } from '../../../models/TableSettings';
import { ListadoInstituciones } from "../../otros/listado-instituciones/listado-instituciones";
import { Institucion } from '../../../models/Institucion';
import { FormPerfil } from "../../formularios/form-perfil/form-perfil";
import { FormPerfilDocente } from "../../formularios/form-perfil-docente/form-perfil-docente";
import { FormContacto } from '../../formularios/form-contacto/form-contacto';
import { Alerts } from '../../../services/alerts';

@Component({
  selector: 'app-docentes',
  imports: [
    MatCardModule,
    ListadoInstituciones,
    MatTabsModule,
    Angular2SmartTableModule,
    FormPerfil,
    FormPerfilDocente,
    FormContacto
],
  templateUrl: './docentes.html',
  styleUrl: './docentes.css'
})
export class Docentes {

  protected alert = inject(Alerts);

  protected settings: Settings;
  protected docentes: LocalDataSource;
  protected institucion: Institucion | null = null;
  protected selectedTab: number = 0;
  protected docenteSeleccionado: number = -1

  constructor() {
    const columnas: IColumns = {
      id: {
        title: 'ID',
        type: 'text',
        width: '5%',
      },
      nombre: {
        title: 'Nombre Docente',
        type: 'text',
      },
      cargo: {
        title: 'Cargo o rol',
        type: 'text',
      },
    };
    this.settings = {...TableSettingsWithAdd};   
    this.settings.columns = columnas;
    this.docentes = new LocalDataSource();
  }

  cargarDocentes(): void {
    // Cargar docentes con la institucion seleccionada
    if (this.institucion !== null) {
      this.docentes.load([
        { id: 1, nombre: 'Docente A', cargo: 'Profesor' },
        { id: 2, nombre: 'Docente B', cargo: 'Asistente' },
        { id: 3, nombre: 'Docente C', cargo: 'Coordinador' },
        { id: 4, nombre: 'Docente D', cargo: 'Profesor' },
        { id: 5, nombre: 'Docente E', cargo: 'Asistente' },
        { id: 6, nombre: 'Docente F', cargo: 'Coordinador' }
      ]);
    }
  }

  institucionSelected(institucion: Institucion) {
    this.institucion = institucion;
    this.cargarDocentes();
  }

  agregarDocente() {
    this.setTab(1);
    this.docenteSeleccionado = -1;
    console.log('Agregar docentes');
  }

  eventoDocentes(event: CustomActionEvent) {
    if (event.action === 'ver') {
      this.setTab(1);
      this.docenteSeleccionado = event.data.id;
    } else if (event.action === 'retirar') {
      this.alert.confirm(true).then((result) => {
        if (result.isConfirmed) {
          console.log('Docente retirado:', event.data);
          this.docentes.remove(event.data);
          this.alert.success();
        }
      });
    }
  }

  recargarDocentes() {
    this.setTab(0);
    this.cargarDocentes();
  }

  setTab(index: number) {
    this.selectedTab = index;
  }

}
