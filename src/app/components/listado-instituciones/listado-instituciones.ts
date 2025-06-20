import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-listado-instituciones',
  imports: [
    MatCardModule,
  ],
  templateUrl: './listado-instituciones.html',
  styleUrl: './listado-instituciones.css'
})
export class ListadoInstituciones {

  usuarioId = input<number>();
  institucionSelected = output<number>();

  protected instituciones: any[] = [
    { id: 1, nombre: 'Institución A', estado: 'Aceptado' },
    { id: 2, nombre: 'Institución B', estado: 'Rechazado' },
    { id: 3, nombre: 'Institución C', estado: 'Pendiente' },
    { id: 4, nombre: 'Institución D', estado: 'Aceptado' },
    { id: 5, nombre: 'Institución E', estado: 'Rechazado' },
    { id: 6, nombre: 'Institución F', estado: 'Pendiente' }
  ];

  constructor() {}

  ngOnInit() {
    // Cargar instituciones usand el usuarioId. 
    // Si solo hay una institución, seleccionarla automáticamente
    if (this.instituciones.length === 1) {
      this.seleccionar(this.instituciones[0].id);
    }
  }

  seleccionar(id: number) {
    this.institucionSelected.emit(id);
  }
}