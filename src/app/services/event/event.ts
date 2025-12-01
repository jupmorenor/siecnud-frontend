import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public curso = new EventEmitter<string>();
  public institucion = new EventEmitter<string>();
}
