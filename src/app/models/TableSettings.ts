import { Settings, Actions } from "angular2-smart-table";

export const baseActions: Actions = {
    position: 'right',
    columnTitle: 'Acciones',
    add: false,
    edit: false,
    delete: false,
}

const actions: Actions = {
    ...baseActions,
    custom: [
        {
            name: 'ver',
            title: '<i class="material-icons" title="Ver detalle">visibility</i>'
        }
    ]
}

const actions2: Actions = {
    ...baseActions,
    add: true,
    custom: [
        {
            name: 'ver',
            title: '<i class="material-icons" title="Ver detalle">visibility</i>'
        },
        {
            name: 'retirar',
            title: '<i class="material-icons" title="Retirar">remove_circle</i>'
        }
    ]
}

const actions3: Actions = {
    ...baseActions,
    add: true,
    custom: [
        {
            name: 'asignar',
            title: '<i class="material-icons" title="Asignar docente">assignment</i>'
        },
        {
            name: 'registrar',
            title: '<i class="material-icons" title="Registrar Estudiantes">groups</i>'
        },
        {
            name: 'cerrar',
            title: '<i class="material-icons" title="Cerrar">remove_circle</i>'
        }
    ]
}

export const actions4: Actions = {
    ...baseActions,
    add: true,
    custom: [
        {
            name: 'ver',
            title: '<i class="material-icons" title="Ver detalle">visibility</i>'
        },
        {
            name: 'responder',
            title: '<i class="material-icons" title="Responder">edit</i>'
        },
        {
            name: 'validar',
            title: '<i class="material-icons" title="Validar">check_circle</i>'
        },
        {
            name: 'calificar',
            title: '<i class="material-icons" title="Calificar">grading</i>',
        },
        {
            name: 'reporte_individual',
            title: '<i class="material-icons" title="Ver reporte individual de curso">groups</i>',
        },
        {
            name: 'reporte_consolidado',
            title: '<i class="material-icons" title="Ver reporte consolidado de curso">fact_check</i>',
        },
        {
            name: 'cerrar',
            title: '<i class="material-icons" title="Cerrar">lock</i>',
        },
    ]
}

export const TableSettings: Settings = {
    columns: {},
    mode: 'external',
    actions: actions,
    noDataMessage: 'No hay datos disponibles',
}

export const TableSettingsWithAdd: Settings = {
    ...TableSettings,
    add: {
        addButtonContent: '<i class="material-icons" title="Agregar">add_circle_outline</i>'
    },
    actions: actions2
}

export const TableSettingsWithAdd2: Settings = {
    ...TableSettings,
    add: {
        addButtonContent: '<i class="material-icons" title="Agregar">add_circle_outline</i>'
    },
    actions: actions3
}
