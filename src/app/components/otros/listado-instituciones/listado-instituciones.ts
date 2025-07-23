import { Component, input, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Institucion } from '../../../models/Institucion';

@Component({
  selector: 'app-listado-instituciones',
  imports: [
    MatCardModule,
  ],
  templateUrl: './listado-instituciones.html',
  styleUrl: './listado-instituciones.css'
})
export class ListadoInstituciones implements OnInit {

  usuarioId = input<number>();
  institucionSelected = output<Institucion>();

  protected instituciones: Institucion[] = [
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
      setTimeout(() => {
        this.seleccionar(this.instituciones[0]);
      })
    }
  }

  seleccionar(inst: Institucion) {
    this.institucionSelected.emit(inst);
  }
}