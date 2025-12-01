import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { EventService } from '../../../services/event/event';

@Component({
  selector: 'app-cuestionarios',
  imports: [
    MatCardModule,
    RouterOutlet
],
  templateUrl: './cuestionarios.html',
  styleUrl: './cuestionarios.css'
})
export class Cuestionarios implements OnInit, OnDestroy {

  protected event = inject(EventService);
  protected institucion = signal<string>('');
  protected curso = signal<string>('');

  protected institucionSubscription: any;
  protected cursoSubscription: any;

  ngOnInit(): void {
    this.institucionSubscription = this.event.institucion.subscribe((nombre: string) => {
      this.institucion.set(nombre);
    });
    this.cursoSubscription = this.event.curso.subscribe((nombre: string) => {
      this.curso.set(nombre);
    });
  }

  ngOnDestroy(): void {
    this.institucionSubscription.unsubscribe();
    this.cursoSubscription.unsubscribe();
  }

}
