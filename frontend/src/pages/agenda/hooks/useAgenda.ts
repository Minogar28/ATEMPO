import { useState } from 'react'
import { alertConfirm, swalFire } from '@src/helpers/alert'
import {
  cancelarCita,
  completarCita,
  createCita,
  listCitas,
} from '@src/services/citas.service'
import type { Cita } from '@src/services/citas.service'
import { deleteBloque, etiquetaBloque, listBloques } from '@src/services/disponibilidad.service'
import { listRegistros } from '@src/services/gestion.service'
import type { Psicologo, SlotDisponible } from '../types'

// Los horarios que el paciente puede reservar son los bloques de
// disponibilidad reales que el psicólogo abrió en su calendario
// (atempo.gestion.disponibilidad) — reservar consume el bloque.
export const useAgenda = () => {
  const [citas, setCitas] = useState<Cita[]>(listCitas)
  const [bloques, setBloques] = useState(listBloques)
  const [seleccionado, setSeleccionado] = useState<Psicologo | null>(null)
  const [slot, setSlot] = useState<SlotDisponible | null>(null)
  const [sesion, setSesion] = useState<Cita | null>(null)
  const [search, setSearch] = useState('')

  const term = search.trim().toLowerCase()
  const citasVisibles = term
    ? citas.filter((c) => `${c.psicologo} ${c.estado} ${c.fecha}`.toLowerCase().includes(term))
    : citas

  // Psicólogos del registro de Gestión; bloques sin dueño (legacy) se
  // asignan al primero para que sigan siendo reservables.
  const registros = listRegistros('psicologos')
  const psicologos: Psicologo[] = registros.map((r) => {
    const nombre = r.values.nombre
    return {
      id: r.id,
      nombre,
      especialidad: r.values.especialidad ?? 'Psicología clínica',
      rating: 4.8,
      slots: bloques
        .filter((b) => (b.psicologo ?? registros[0]?.values.nombre) === nombre)
        .filter((b) => new Date(b.end).getTime() > Date.now())
        .map((b) => ({ bloqueId: b.id, ...etiquetaBloque(b) })),
    }
  })

  const seleccionar = (p: Psicologo, s: SlotDisponible) => {
    setSeleccionado(p)
    setSlot(s)
  }

  const reservar = () => {
    if (!seleccionado || !slot) return
    const cita = createCita({
      psicologoId: seleccionado.id,
      psicologo: seleccionado.nombre,
      fecha: slot.fecha,
      hora: slot.hora,
      modalidad: 'virtual',
    })
    // El bloque queda ocupado: desaparece de la disponibilidad.
    deleteBloque(slot.bloqueId)
    setBloques(listBloques())
    setCitas(listCitas())
    void swalFire({
      icon: 'success',
      title: 'Cita confirmada',
      text: `${cita.psicologo} · ${cita.fecha} ${cita.hora} — sala de Meet creada`,
      timer: 2200,
      showConfirmButton: false,
    })
    setSeleccionado(null)
    setSlot(null)
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
