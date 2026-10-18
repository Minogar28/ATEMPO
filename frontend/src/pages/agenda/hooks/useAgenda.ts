import { useState } from 'react'
import { alertConfirm, swalFire } from '@src/helpers/alert'
import {
  cancelarCita,
  completarCita,
  createCita,
  listCitas,
} from '@src/services/citas.service'
import type { Cita } from '@src/services/citas.service'
import type { Psicologo } from '../types'

const psicologos: Psicologo[] = [
  { id: 1, nombre: 'Dra. Camila Torres', especialidad: 'Ansiedad y estrés laboral', rating: 4.9, disponibles: ['09:00', '10:30', '14:00', '16:30'] },
  { id: 2, nombre: 'Dr. Andrés Mejía', especialidad: 'Terapia cognitivo-conductual', rating: 4.8, disponibles: ['08:00', '11:00', '15:30'] },
  { id: 3, nombre: 'Dra. Laura Gómez', especialidad: 'Mindfulness clínico', rating: 4.7, disponibles: ['10:00', '13:00', '17:00'] },
]

// Las citas persisten en localStorage (services/citas.service.ts): reservar
// crea la cita con su sala de Meet simulada, "entrar" abre la sesión virtual y
// completarla alimenta el estado del avatar.
export const useAgenda = () => {
  const [citas, setCitas] = useState<Cita[]>(listCitas)
  const [seleccionado, setSeleccionado] = useState<Psicologo | null>(null)
  const [slot, setSlot] = useState('')
  const [sesion, setSesion] = useState<Cita | null>(null)
  const [search, setSearch] = useState('')

  const term = search.trim().toLowerCase()
  const citasVisibles = term
    ? citas.filter((c) => `${c.psicologo} ${c.estado} ${c.fecha}`.toLowerCase().includes(term))
    : citas

  // Seleccionar horario dentro de la tarjeta de cada psicólogo.
  const seleccionar = (p: Psicologo, hora: string) => {
    setSeleccionado(p)
    setSlot(hora)
  }

  const reservar = () => {
    if (!seleccionado || !slot) return
    const cita = createCita({
      psicologoId: seleccionado.id,
      psicologo: seleccionado.nombre,
      fecha: 'Próx. disponible',
      hora: slot,
      modalidad: 'virtual',
    })
    setCitas(listCitas())
    void swalFire({
      icon: 'success',
      title: 'Cita confirmada',
      text: `${cita.psicologo} · ${cita.hora} — sala de Meet creada`,
      timer: 2200,
      showConfirmButton: false,
    })
    setSeleccionado(null)
    setSlot('')
  }

  const entrar = (cita: Cita) => setSesion(cita)

  const finalizarSesion = () => {
    if (sesion) {
      completarCita(sesion.id)
      setCitas(listCitas())
    }
    setSesion(null)
    void swalFire({ icon: 'success', title: 'Sesión finalizada', timer: 1500, showConfirmButton: false })
  }

  const cancelar = async (cita: Cita) => {
    const result = await alertConfirm(
      '¿Cancelar cita?',
      `La sesión con ${cita.psicologo} del ${cita.fecha} ${cita.hora} quedará cancelada.`,
    )
    if (!result.isConfirmed) return
    cancelarCita(cita.id)
    setCitas(listCitas())
    void swalFire({ icon: 'success', title: 'Cita cancelada', timer: 1400, showConfirmButton: false })
  }

  return {
    psicologos, citas: citasVisibles, search, setSearch,
    seleccionado, slot, seleccionar,
    sesion, entrar, finalizarSesion,
    reservar, cancelar,
  }
}
