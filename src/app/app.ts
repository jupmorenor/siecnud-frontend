import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
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
      { name: 'Home', icon: 'home', route: '/' },
      { name: 'About', icon: 'info', route: '/about' },
      { name: 'Contact', icon: 'contact_mail', route: '/contact' }
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
