import { Component } from '@angular/core';
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

@Component({
  selector: 'app-instituciones',
  imports: [
    MatCardModule,
    MatTabsModule,
    Angular2SmartTableModule,
  ],
  templateUrl: './instituciones.html',
  styleUrl: './instituciones.css'
})
export class Instituciones {

  protected settings: Settings;
  protected instituciones: LocalDataSource

  constructor() {
    const columnas: IColumns = {
      id: {
        title: 'ID',
        type: 'text',
        hide: true,
      },
      nombre: {
        title: 'Nombre Institución',
        type: 'text',
      },
      estado: {
        title: 'Estado',
        type: 'text',
      },
    }
    this.settings = {...TableSettings}
    this.settings.columns = columnas
    this.instituciones = new LocalDataSource();
  }

  ngOnInit() {
    this.instituciones.load([
      { id: 1, nombre: 'Institución A', estado: 'Aceptado' },
      { id: 2, nombre: 'Institución B', estado: 'Rechazado' },
      { id: 3, nombre: 'Institución C', estado: 'Pendiente' }
    ]);
  }

  verInstitucion(event: CustomActionEvent) {
    console.log('Ver institución:', event.data);
  }

}
