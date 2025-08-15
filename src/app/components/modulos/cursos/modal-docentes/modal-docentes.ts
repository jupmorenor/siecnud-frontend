import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { 
  Angular2SmartTableModule,
  LocalDataSource,
  Settings,
  IColumns,
  RowSelectionEvent
} from 'angular2-smart-table';
import { baseActions } from '../../../../models/TableSettings';

@Component({
  selector: 'app-modal-docentes',
  imports: [
    MatDialogModule,
    MatButtonModule,
    Angular2SmartTableModule,
  ],
  templateUrl: './modal-docentes.html',
  styleUrl: './modal-docentes.css'
})
export class ModalDocentes implements OnInit {

  protected dialogRef = inject(MatDialogRef<ModalDocentes>);
  protected data = inject(MAT_DIALOG_DATA);

  protected settings: Settings;
  protected docentes: LocalDataSource;
  protected docentesSeleccionados: any[] = [];

  constructor() {
    const columns: IColumns = {
      id: {
        title: 'ID',
        type: 'text',
        width: '6%',
        isEditable: false,
      },
      nombre: {
        title: 'Nombre Docente',
        type: 'text',
        isEditable: false,
      },
      rol: {
        title: 'Cargo o rol',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '1', title: 'Titular' },
              { value: '2', title: 'Pasante' },
              { value: '3', title: 'Innovador' },
              { value: '4', title: 'Asistente' },
              { value: '5', title: 'Profesor' }
            ],
          },
        }
      },
    }
    this.settings = {
      columns: columns,
      actions: {
        ...baseActions,
        edit: true,
      },
      edit: {
        editButtonContent: '<i class="material-icons" title="Editar">edit</i>',
        saveButtonContent: '<i class="material-icons" title="Guardar">check</i>',
        cancelButtonContent: '<i class="material-icons" title="Cancelar">close</i>'
      },
      selectMode: 'multi',
      noDataMessage: 'No hay datos disponibles',
    }
    this.docentes = new LocalDataSource();
    this.dialogRef.backdropClick().subscribe(() => this.dialogRef.close());
  }

  ngOnInit(): void {
    // Cargar docentes con la institucion seleccionada
    if (this.data.institucion) {
      this.docentes.load([
        { id: 1, nombre: 'Docente A', cargo: 'Profesor' },
        { id: 2, nombre: 'Docente B', cargo: 'Asistente' },
        { id: 3, nombre: 'Docente C', cargo: 'Titular' },
        { id: 4, nombre: 'Docente D', cargo: 'Pasante' },
      ]);
    }
  }

  onRowSelect(event: RowSelectionEvent): void {
    this.docentesSeleccionados = event.selected;
  }

}
