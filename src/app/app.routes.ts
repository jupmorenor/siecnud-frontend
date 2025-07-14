import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Instituciones } from './components/instituciones/instituciones';
import { Docentes } from './components/docentes/docentes';
import { Cursos } from './components/cursos/cursos';
import { Cuestionarios } from './components/cuestionarios/cuestionarios';
import { Perfil } from './components/perfil/perfil';
import { Registro } from './components/registro/registro';
import { Web } from './components/web/web';

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
