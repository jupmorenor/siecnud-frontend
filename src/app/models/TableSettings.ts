import { Settings } from "angular2-smart-table";

export const TableSettings: Settings = {
    columns: {},
    mode: 'external',
    actions: {
        position: 'right',
        add: false,
        edit: false,
        delete: false,
        custom: [
            {
                name: 'ver',
                title: '<i class="material-icons">visibility</i>'
            }
        ]
    },
    noDataMessage: 'No hay datos disponibles',

}