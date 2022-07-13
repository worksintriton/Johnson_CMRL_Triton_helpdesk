import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success_message(message: string){
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'success', });
  }

  info_message(message: string){
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'info', });
  }

  warning_message(message: string){
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'warning', });
  }

  error_message(message: string){
    Swal.fire({toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, title: message, icon: 'error', });
  }
}
