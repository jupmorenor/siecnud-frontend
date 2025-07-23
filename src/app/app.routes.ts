import { Routes } from '@angular/router';
import { Home } from './components/otros/home/home';
import { Instituciones } from './components/modulos/instituciones/instituciones';
import { Docentes } from './components/modulos/docentes/docentes';
import { Cursos } from './components/modulos/cursos/cursos';
import { Cuestionarios } from './components/modulos/cuestionarios/cuestionarios';
import { Perfil } from './components/otros/perfil/perfil';
import { Registro } from './components/pagina/registro/registro';
import { Web } from './components/pagina/web/web';

export const routes: Routes = [
    {
        path: '',
        component: Web
    },
    {
        path: 'registro',
        component: Registro
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'instituciones',
        component: Instituciones
    },
    {
        path: 'docentes',
        component: Docentes
    },
    {
        path: 'cursos',
        component: Cursos
    },
    {
        path: 'cuestionarios',
        component: Cuestionarios
    },
    {
        path: 'perfil',
        component: Perfil
    }
];
