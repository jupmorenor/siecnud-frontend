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
    actions: {
        ...TableSettings.actions,
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
}



