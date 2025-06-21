import { Settings, Actions } from "angular2-smart-table";

const actions: Actions = {
    position: 'right',
    add: false,
    edit: false,
    delete: false,
    custom: [
        {
            name: 'ver',
            title: '<i class="material-icons" title="Ver detalle">visibility</i>'
        }
    ]
}

const actions2: Actions = {
    position: 'right',
    add: true,
    edit: false,
    delete: false,
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
    position: 'right',
    add: true,
    edit: false,
    delete: false,
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



