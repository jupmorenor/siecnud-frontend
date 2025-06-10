import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'siecnud-frontend';
  protected menu: any[];
  protected open = false;

  constructor() {
    this.menu = [
      { name: 'Inicio', icon: 'home', route: '/' },
      { name: 'Instituciones', icon: 'location_city', route: '/insituciones' },
      { name: 'Docentes', icon: 'local_cafe', route: '/docentes' },
      { name: 'Cursos', icon: 'book', route: '/cursos' },
      { name: 'Cuestionarios', icon: 'file_copy', route: '/cuestionarios' },
    ];
  }

  protected toggleSidenav() {
    this.open = !this.open;
  }

  protected navigate(route: string) {
    // Logic to navigate to the specified route
    console.log(`Navigating to ${route}`);
  }
}
