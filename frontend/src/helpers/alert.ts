import Swal from 'sweetalert2'
import type { SweetAlertOptions } from 'sweetalert2'

const ThemedSwal = Swal.mixin({
  confirmButtonColor: '#E2B84A',
  cancelButtonColor: '#7a8494',
  background: '#1F3A5F',
  color: '#FAF6ED',
})

export const swalFire = (options: SweetAlertOptions) => ThemedSwal.fire(options)

export const alertSuccess = (title: string, text?: string) =>
  swalFire({ icon: 'success', title, text })

export const alertError = (title: string, text?: string) =>
  swalFire({ icon: 'error', title, text })

export const alertConfirm = (title: string, text?: string) =>
  swalFire({
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  })
