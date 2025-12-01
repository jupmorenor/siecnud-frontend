import { Routes } from '@angular/router';
import { Home } from './components/otros/home/home';
import { Instituciones } from './components/modulos/instituciones/instituciones';
import { Docentes } from './components/modulos/docentes/docentes';
import { Cursos } from './components/modulos/cursos/cursos';
import { Cuestionarios } from './components/modulos/cuestionarios/cuestionarios';
import { Perfil } from './components/otros/perfil/perfil';
import { Registro } from './components/pagina/registro/registro';
import { Web } from './components/pagina/web/web';
import { DetalleCuestionario } from './components/modulos/cuestionarios/detalle-cuestionario/detalle-cuestionario';
import { RespuestaCuestionario } from './components/modulos/cuestionarios/respuesta-cuestionario/respuesta-cuestionario';
import { ListaCuestionarios } from './components/modulos/cuestionarios/lista-cuestionarios/lista-cuestionarios';

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
        component: Cuestionarios,
        children: [
            {
                path: '',
                component: ListaCuestionarios
            },
            {
                path: 'detalle-cuestionario',
                component: DetalleCuestionario,
            },
            {
                path: 'responder-cuestionario/:id',
                component: RespuestaCuestionario,
            },
        ]
    },
    {
        path: 'perfil',
        component: Perfil
    }
];
