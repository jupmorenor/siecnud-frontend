import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Curso } from '../../models/curso';

@Component({
  selector: 'app-listado-cursos',
  imports: [
    MatCardModule
  ],
  templateUrl: './listado-cursos.html',
  styleUrl: './listado-cursos.css'
})
export class ListadoCursos {

  institucionId = input<number>();
  cursoSelected = output<Curso>();

  protected cursos: Curso[] = [
    { id: 1, nombre: 'Curso A' },
    { id: 2, nombre: 'Curso B' },
    { id: 3, nombre: 'Curso C' },
    { id: 4, nombre: 'Curso D' },
    { id: 5, nombre: 'Curso E' }
  ];

  constructor() {}

  ngOnInit() {
    // Cargar cursos usando el institucionId. 
    // Si solo hay un curso, seleccionarlo automáticamente
    if (this.cursos.length === 1) {
      this.seleccionar(this.cursos[0]);
    }
  }

  seleccionar(curso: Curso) {
    this.cursoSelected.emit(curso);
  }

}
