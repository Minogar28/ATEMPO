import { useState } from 'react'
import { alertConfirm, swalFire } from '@src/helpers/alert'
import {
  createGuia,
  createGuiaBib,
  deleteGuia,
  deleteGuiaBib,
  extractYoutubeId,
  listGuias,
  listGuiasBib,
  updateGuia,
  updateGuiaBib,
} from '@src/services/guias.service'
import type { GuiaBiblioteca, VideoGuia } from '@src/services/guias.service'
import { useAuth } from '@src/states/AuthContext'
import {
  createBloque,
  deleteBloque,
  listBloques,
} from '@src/services/disponibilidad.service'
import type { BloqueDisponible } from '@src/services/disponibilidad.service'
import { createTip, deleteTip, listTips, METRICA_EXPLICACIONES, updateTip } from '@src/services/tips.service'
import type { Tip, TipContexto } from '@src/services/tips.service'
import type { Cita } from '@src/services/citas.service'
import type { CitaEvento } from '@src/components/Calendar/helper'
import type { CitaDia, PacienteAsignado } from '../types'

const pacientes: PacienteAsignado[] = [
  { id: 1, nombre: 'Laura Peña', empresa: 'TechCorp', estres: 72, ultimaCita: 'Mar 18', nota: 'Seguimiento ansiedad laboral' },
  { id: 2, nombre: 'Carlos Ruiz', empresa: 'TechCorp', estres: 41, ultimaCita: 'Jue 20', nota: 'Progreso estable' },
  { id: 3, nombre: 'Ana Sofía Vega', empresa: 'Grupo Nova', estres: 55, ultimaCita: 'Mar 11' },
  { id: 4, nombre: 'Miguel Ortiz', empresa: 'TechCorp', estres: 28, ultimaCita: 'Vie 14' },
]

const citasHoy: CitaDia[] = [
  { id: 1, paciente: 'Laura Peña', hora: '09:30', estado: 'completada', estresPaciente: 72 },
  { id: 2, paciente: 'Carlos Ruiz', hora: '11:00', estado: 'confirmada', estresPaciente: 41 },
  { id: 3, paciente: 'Ana Sofía Vega', hora: '15:30', estado: 'pendiente', estresPaciente: 55 },
]

const EMPTY_GUIA = { titulo: '', youtubeUrl: '', categoria: 'Respiración', duracion: '', descripcion: '', pasos: '' }

export const useMiPanel = () => {
  const { user } = useAuth()
  const [tab, setTab] = useState('agenda')
  const [bloques, setBloques] = useState<BloqueDisponible[]>(listBloques)
  const [guias, setGuias] = useState<VideoGuia[]>(listGuias)
  const [guiasBib, setGuiasBib] = useState<GuiaBiblioteca[]>(listGuiasBib)
  const [guiaModal, setGuiaModal] = useState(false)
  const [guiaForm, setGuiaForm] = useState(EMPTY_GUIA)
  const [tipoGuia, setTipoGuia] = useState<'video' | 'pasos'>('video')
  const [editingGuiaId, setEditingGuiaId] = useState<string | null>(null)
  const [editingBibId, setEditingBibId] = useState<string | null>(null)
  const [previewGuia, setPreviewGuia] = useState<VideoGuia | null>(null)
  const [previewBib, setPreviewBib] = useState<GuiaBiblioteca | null>(null)
  const [pacienteView, setPacienteView] = useState<PacienteAsignado | null>(null)
  const [sesion, setSesion] = useState<Cita | null>(null)
  const [tips, setTips] = useState<Tip[]>(listTips)
  const [tipModal, setTipModal] = useState(false)
  const [tipForm, setTipForm] = useState<{ texto: string; contexto: TipContexto }>({ texto: '', contexto: 'inicio' })
  const [editingTipId, setEditingTipId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const term = search.trim().toLowerCase()
  const citasVisibles = term
    ? citasHoy.filter((c) => `${c.paciente} ${c.estado} ${c.hora}`.toLowerCase().includes(term))
    : citasHoy
  const pacientesVisibles = term
    ? pacientes.filter((p) => `${p.nombre} ${p.empresa} ${p.nota ?? ''}`.toLowerCase().includes(term))
    : pacientes
  const guiasVisibles = term
    ? guias.filter((g) => `${g.titulo} ${g.categoria} ${g.descripcion}`.toLowerCase().includes(term))
    : guias
  const bibVisibles = term
    ? guiasBib.filter((g) => `${g.titulo} ${g.categoria} ${g.descripcion}`.toLowerCase().includes(term))
    : guiasBib
  const tipsVisibles = term
    ? tips.filter((t) => `${t.texto} ${t.creadoPor}`.toLowerCase().includes(term))
    : tips

  // Disponibilidad persistida: arrastrar en el calendario abre un bloque,
  // tocarlo lo quita. El paciente reservará sobre estos mismos bloques.
  const abrirBloque = (start: Date, end: Date) => {
    createBloque({ start: start.toISOString(), end: end.toISOString(), psicologo: user?.name })
    setBloques(listBloques())
    void swalFire({ icon: 'success', title: 'Disponibilidad abierta', timer: 1400, showConfirmButton: false })
  }

  const quitarBloque = (id: string) => {
    deleteBloque(id)
    setBloques(listBloques())
    void swalFire({ icon: 'success', title: 'Bloque eliminado', timer: 1400, showConfirmButton: false })
  }

  // Detalle: abre la ficha del paciente de la cita (signos + estrés + nota).
  const verDetalleCita = (c: CitaDia) =>
    setPacienteView(pacientes.find((p) => p.nombre === c.paciente) ?? null)

  // Iniciar: abre la misma sala virtual de Agenda. La contraparte en la
  // sesión es el paciente — el campo `psicologo` del modelo Cita se usa
  // como "participante remoto" en SesionVirtual.
  const iniciarCita = (c: CitaDia) =>
    setSesion({
      id: c.id,
      ts: Date.now(),
      psicologoId: c.id,
      psicologo: c.paciente,
      fecha: 'Hoy',
      hora: c.hora,
      modalidad: 'virtual',
      estado: 'confirmada',
      meetUrl: `https://meet.google.com/ate-${String(c.id).padStart(3, '0')}-mpn`,
    })

  const finalizarSesion = () => {
    setSesion(null)
    void swalFire({ icon: 'success', title: 'Sesión finalizada', timer: 1500, showConfirmButton: false })
  }

  // Las citas de hoy también se pintan en el calendario (mustard).
  const citasEventos: CitaEvento[] = citasHoy.map((c) => {
    const [h, m] = c.hora.split(':').map(Number)
    const start = new Date()
    start.setHours(h, m, 0, 0)
    return { id: String(c.id), title: `Cita · ${c.paciente}`, start: start.toISOString() }
  })

  const setGuiaField = (name: string, value: string) =>
    setGuiaForm((prev) => ({ ...prev, [name]: value }))

  const videoId = extractYoutubeId(guiaForm.youtubeUrl)
  const guiaValid = tipoGuia === 'video'
    ? Boolean(guiaForm.titulo.trim() && videoId && guiaForm.categoria && guiaForm.duracion.trim())
    : Boolean(guiaForm.titulo.trim() && guiaForm.categoria && guiaForm.duracion.trim() && guiaForm.pasos.trim())

  const openGuiaModal = (guia?: VideoGuia) => {
    setTipoGuia('video')
    setEditingBibId(null)
    setEditingGuiaId(guia?.id ?? null)
    setGuiaForm(
      guia
        ? { ...EMPTY_GUIA, titulo: guia.titulo, youtubeUrl: guia.youtubeUrl, categoria: guia.categoria, duracion: guia.duracion, descripcion: guia.descripcion }
        : EMPTY_GUIA,
    )
    setGuiaModal(true)
  }

  const openBibModal = (guia?: GuiaBiblioteca) => {
    setTipoGuia('pasos')
    setEditingGuiaId(null)
    setEditingBibId(guia?.id ?? null)
    setGuiaForm(
      guia
        ? { ...EMPTY_GUIA, titulo: guia.titulo, categoria: guia.categoria, duracion: guia.duracion, descripcion: guia.descripcion, pasos: guia.pasos.join('\n') }
        : EMPTY_GUIA,
    )
    setGuiaModal(true)
  }

  const guardarGuia = () => {
    if (!guiaValid) return
    try {
      if (tipoGuia === 'pasos') {
        const input = {
          titulo: guiaForm.titulo,
          categoria: guiaForm.categoria,
          duracion: guiaForm.duracion,
          descripcion: guiaForm.descripcion,
          pasos: guiaForm.pasos.split('\n'),
          creadoPor: user?.name ?? 'Psicólogo',
        }
        if (editingBibId) {
          updateGuiaBib(editingBibId, input)
        } else {
          createGuiaBib(input)
        }
        setGuiasBib(listGuiasBib())
      } else {
        const input = {
          titulo: guiaForm.titulo,
          youtubeUrl: guiaForm.youtubeUrl,
          categoria: guiaForm.categoria,
          duracion: guiaForm.duracion,
          descripcion: guiaForm.descripcion,
          creadoPor: user?.name ?? 'Psicólogo',
        }
        if (editingGuiaId) {
          updateGuia(editingGuiaId, input)
        } else {
          createGuia(input)
        }
        setGuias(listGuias())
      }
      void swalFire({
        icon: 'success',
        title: editingGuiaId || editingBibId ? 'Guía actualizada' : 'Guía publicada',
        text: 'Ya es visible para tus pacientes en Autorregulación.',
        timer: 1800,
        showConfirmButton: false,
      })
      setGuiaModal(false)
      setEditingGuiaId(null)
      setEditingBibId(null)
    } catch {
      void swalFire({ icon: 'error', title: 'URL inválida', text: 'Pega un enlace de YouTube válido (watch, youtu.be o shorts).' })
    }
  }

  const eliminarGuia = async (id: string) => {
    const result = await alertConfirm('¿Eliminar guía?', 'Los pacientes dejarán de verla en Autorregulación.')
    if (!result.isConfirmed) return
    deleteGuia(id)
    setGuias(listGuias())
    void swalFire({ icon: 'success', title: 'Guía eliminada', timer: 1400, showConfirmButton: false })
  }

  const eliminarGuiaBib = async (id: string) => {
    const result = await alertConfirm('¿Eliminar guía?', 'Los pacientes dejarán de verla en la biblioteca de Autorregulación.')
    if (!result.isConfirmed) return
    deleteGuiaBib(id)
    setGuiasBib(listGuiasBib())
    void swalFire({ icon: 'success', title: 'Guía eliminada', timer: 1400, showConfirmButton: false })
  }

  // Tips: el psicólogo publica frases que rotan en el Inicio del paciente
  // ('inicio') o como tooltips sobre las métricas ('metricas').
  const openTipModal = (tip?: Tip) => {
    setEditingTipId(tip?.id ?? null)
    setTipForm(tip ? { texto: tip.texto, contexto: tip.contexto } : { texto: '', contexto: 'inicio' })
    setTipModal(true)
  }

  const tipValid = Boolean(tipForm.texto.trim())

  const guardarTip = () => {
    if (!tipValid) return
    const input = { texto: tipForm.texto.trim(), contexto: tipForm.contexto, creadoPor: user?.name ?? 'Psicólogo' }
    if (editingTipId) updateTip(editingTipId, input)
    else createTip(input)
    setTips(listTips())
    setTipModal(false)
    setEditingTipId(null)
    void swalFire({
      icon: 'success',
      title: editingTipId ? 'Tip actualizado' : 'Tip publicado',
      text: tipForm.contexto === 'inicio' ? 'Rotará en el Inicio de tus pacientes.' : 'Aparecerá en los tooltips de las métricas.',
      timer: 1800,
      showConfirmButton: false,
    })
  }

  const eliminarTip = async (id: string) => {
    const result = await alertConfirm('¿Eliminar tip?', 'Dejará de aparecer en los módulos de los pacientes.')
    if (!result.isConfirmed) return
    deleteTip(id)
    setTips(listTips())
    void swalFire({ icon: 'success', title: 'Tip eliminado', timer: 1400, showConfirmButton: false })
  }

  const stats = [
    { label: 'Pacientes activos', value: pacientes.length, tip: METRICA_EXPLICACIONES.pacientes },
    { label: 'Citas esta semana', value: 14, tip: METRICA_EXPLICACIONES.citas },
    { label: 'Estrés promedio', value: 49, tip: METRICA_EXPLICACIONES.estres },
    { label: 'Guías publicadas', value: guias.length + guiasBib.length, tip: METRICA_EXPLICACIONES.guias },
  ]

  return {
    tab, setTab,
    bloques, citasEventos, abrirBloque, quitarBloque,
    pacientes: pacientesVisibles, citasHoy: citasVisibles, stats,
    search, setSearch,
    guias: guiasVisibles, guiaModal, setGuiaModal, openGuiaModal,
    guiaForm, setGuiaField, videoId, guiaValid, guardarGuia, eliminarGuia,
    tipoGuia, setTipoGuia, editingGuiaId, previewGuia, setPreviewGuia,
    guiasBib: bibVisibles, openBibModal, eliminarGuiaBib, editingBibId,
    previewBib, setPreviewBib,
    tips: tipsVisibles, tipModal, setTipModal, tipForm, setTipForm,
    openTipModal, guardarTip, eliminarTip, tipValid, editingTipId,
    pacienteView, setPacienteView,
    sesion, iniciarCita, finalizarSesion, verDetalleCita,
  }
}
