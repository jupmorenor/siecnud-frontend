import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  CustomActionEvent,
  IColumns
} from 'angular2-smart-table';
import { TableSettings } from '../../models/TableSettings';
import { ListadoInstituciones } from "../listado-instituciones/listado-instituciones";

@Component({
  selector: 'app-docentes',
  imports: [
    MatCardModule,
    ListadoInstituciones,
    MatTabsModule,
    Angular2SmartTableModule,
],
  templateUrl: './docentes.html',
  styleUrl: './docentes.css'
})
export class Docentes implements OnInit {

  protected settings: Settings;
  protected docentes: LocalDataSource;
  protected institucion: number = 0;

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
    }
    this.settings = {...TableSettings}
    /* this.settings.actions.add = true;
    this.settings.actions.custom.push({
      name: 'retirar',
      title: '<i class="material-icons">remove_circle</i>',
    }); */
    
    this.settings.columns = columnas
    this.docentes = new LocalDataSource();
  }

  ngOnInit(): void {
    // Cargar docentes con la institucion seleccionada
    if (this.institucion !== 0) {
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

  institucionSelected(institucionId: number) {
    this.institucion = institucionId;
    this.ngOnInit();
  }

  eventoDocentes(event: CustomActionEvent) {
    console.log('Evento docentes:', event);
    if (event.action === 'ver') {
      console.log('Ver docente:', event.data);
    } else if (event.action === 'retirar') {
      console.log('Retirar docente:', event.data);
    }
  }

}
