import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Alerts {

  constructor() { }

  confirm(eliminar?: Boolean): Promise<SweetAlertResult> {
    return Swal.fire({
        title: `${eliminar ? 'Eliminar' : 'Guardar'} datos`,
        text: `¿Está seguro de ${eliminar ? 'Eliminar' : 'Guardar'} los datos?`,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: `${eliminar ? 'Eliminar' : 'Guardar'}`,
    });
  }

  success(eliminar?: Boolean): Promise<SweetAlertResult> {
    return Swal.fire({
        title: 'Exito!',
        text: `Datos ${eliminar ? 'eliminados' : 'guardados'} con éxito`,
        icon: 'success',
    });
  }

  error(err: Error): Promise<SweetAlertResult> {
    return Swal.fire({
        title: 'Error',
        titleText: err.name,
        text: err.message,
        icon: 'error',
    });
  }

  loading(): void {
    Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
    });
    Swal.showLoading();
  }

  close(): void {
    Swal.close();
  }
}
