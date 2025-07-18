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
import { FormInstitucion } from "../form-institucion/form-institucion";

@Component({
  selector: 'app-instituciones',
  imports: [
    MatCardModule,
    MatTabsModule,
    Angular2SmartTableModule,
    FormInstitucion
],
  templateUrl: './instituciones.html',
  styleUrl: './instituciones.css'
})
export class Instituciones implements OnInit {

  protected settings: Settings;
  protected instituciones: LocalDataSource;
  protected institucionSeleccionada: number = 0;

  protected selectedTab: number = 0;

  constructor() {
    const columnas: IColumns = {
      id: {
        title: 'ID',
        type: 'text',
        width: '5%',
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
      { id: 3, nombre: 'Institución C', estado: 'Pendiente' },
      { id: 4, nombre: 'Institución D', estado: 'Aceptado' },
      { id: 5, nombre: 'Institución E', estado: 'Rechazado' },
      { id: 6, nombre: 'Institución F', estado: 'Pendiente' }
    ]);
  }

  verInstitucion(event: CustomActionEvent) {
    this.setTab(1);
    this.institucionSeleccionada = event.data.id;
  }

  setTab(index: number) {
    this.selectedTab = index;
  }

  onVeredicto(event: string) {
    switch (event) {
      case 'admitir':
        this.admitirInstitucion();
        break;
      case 'rechazar':
        this.rechazarInstitucion();
        break;
      case 'excluir':
        this.excluirInstitucion();
        break;
      default:
        console.error('Veredicto no reconocido:', event);
    }
  }

  admitirInstitucion() {
    console.log(`Institución ${this.institucionSeleccionada} admitida.`);
  }

  rechazarInstitucion() {
    console.log(`Institución ${this.institucionSeleccionada} rechazada.`);
  }

  excluirInstitucion() {
    console.log(`Institución ${this.institucionSeleccionada} excluida.`);
  }

}
