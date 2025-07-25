import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
    { provide: MAT_DATE_FORMATS,
      useValue: {
        parse: { dateInput: 'DD/MM/YYYY' }, 
        display: { dateInput: 'DD/MM/YYYY' } 
      }
    }
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected router = inject(Router);
  
  protected title = 'siecnud-frontend';
  protected menu: any[];
  protected open = false;
  protected loggedIn = false;

  constructor() {
    this.menu = [
      { name: 'Inicio', icon: 'home', route: '/home' },
      { name: 'Instituciones', icon: 'location_city', route: '/instituciones' },
      { name: 'Docentes', icon: 'local_cafe', route: '/docentes' },
      { name: 'Cursos', icon: 'book', route: '/cursos' },
      { name: 'Cuestionarios', icon: 'file_copy', route: '/cuestionarios' },
    ];
  }

  protected toggleSidenav() {
    this.open = !this.open;
  }

  protected navigate(route: string) {
    this.router.navigate([route]);
  }

  protected logout() {
    this.loggedIn = false;
    this.navigate('/');
  }

  protected login() {
    this.loggedIn = true;
    this.navigate('/home');
  }

}
