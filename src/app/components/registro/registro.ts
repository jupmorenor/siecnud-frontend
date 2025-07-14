import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormInstitucion } from "../form-institucion/form-institucion";

@Component({
  selector: 'app-registro',
  imports: [
    MatCardModule,
    FormInstitucion,
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

}
