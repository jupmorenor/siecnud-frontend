import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormContacto } from "../../formularios/form-contacto/form-contacto";
import { FormPerfil } from "../../formularios/form-perfil/form-perfil";
import { FormPerfilDocente } from "../../formularios/form-perfil-docente/form-perfil-docente";

@Component({
  selector: 'app-perfil',
  imports: [
    MatCardModule,
    FormContacto,
    FormPerfil,
    FormPerfilDocente
],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

  usuarioId: number = 0;

}
