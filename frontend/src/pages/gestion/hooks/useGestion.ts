import { useMemo, useState } from 'react'
import { STORAGE_KEYS } from '@src/config/api'
import { alertConfirm, swalFire } from '@src/helpers/alert'
import { useLocalStorage } from '@src/hooks/useLocalStorage'
import { GESTION_SEED } from '@src/services/gestion.service'
import type { GestionData, GestionRegistro, GestionTab } from '@src/services/gestion.service'
import type { Entidad, FieldDef, FormValues } from '../types'

const FIELD_DEFS: Record<GestionTab, FieldDef[]> = {
  empresas: [
    { name: 'nombre', label: 'Nombre o razón social', type: 'text', required: true },
    { name: 'nit', label: 'NIT', type: 'text', required: true, half: true },
    { name: 'empleados', label: 'N.º de empleados', type: 'number', required: true, half: true },
    { name: 'contacto', label: 'Persona de contacto', type: 'text', required: true, half: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', half: true },
    { name: 'email', label: 'Email corporativo', type: 'email', required: true },
    { name: 'plan', label: 'Plan', type: 'select', required: true, options: ['Básico', 'Estándar', 'Premium'], half: true },
    { name: 'estado', label: 'Estado', type: 'select', required: true, options: ['Activa', 'Pendiente'], half: true },
  ],
  psicologos: [
    { name: 'nombre', label: 'Nombre completo', type: 'text', required: true },
    { name: 'cedula', label: 'Cédula profesional', type: 'text', required: true, half: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', half: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'especialidad', label: 'Especialidad', type: 'text', required: true, half: true },
    { name: 'empresa', label: 'Empresa asignada', type: 'select', required: true, options: [], half: true },
  ],
  pacientes: [
    { name: 'nombre', label: 'Nombre completo', type: 'text', required: true },
    { name: 'cedula', label: 'Cédula', type: 'text', required: true, half: true },
    { name: 'nacimiento', label: 'Fecha de nacimiento', type: 'date', half: true },
    { name: 'email', label: 'Email', type: 'email', required: true, half: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', half: true },
    { name: 'empresa', label: 'Empresa', type: 'select', required: true, options: [], half: true },
    { name: 'psicologo', label: 'Psicólogo asignado', type: 'select', required: true, options: [], half: true },
  ],
}

// El seed vive en services/gestion.service.ts — así otros módulos (empresa,
// reportes) leen los mismos registros persistidos.

// Construye el detalle/extra de la fila a partir de los campos del formulario.
const rowFromForm = (tab: GestionTab, f: FormValues): Omit<Entidad, 'id'> => {
  switch (tab) {
    case 'empresas':
      return { nombre: f.nombre, detalle: `${f.empleados ?? '?'} empleados · ${f.email ?? ''}`, extra: f.estado }
    case 'psicologos':
      return { nombre: f.nombre, detalle: `${f.especialidad ?? ''} · ${f.empresa ?? ''}`, extra: f.cedula }
    case 'pacientes':
      return { nombre: f.nombre, detalle: `${f.empresa ?? ''} · ${f.psicologo ?? ''}`, extra: f.cedula }
  }
}

export const useGestion = () => {
  const [tab, setTab] = useState<GestionTab>('empresas')
  const [search, setSearch] = useState('')
  const [data, setData] = useLocalStorage<GestionData>(
    STORAGE_KEYS.gestion,
    GESTION_SEED,
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<FormValues>({})
  const [editingId, setEditingId] = useState<number | null>(null)
  const [viewing, setViewing] = useState<GestionRegistro | null>(null)

  // Los selects de empresa/psicólogo ofrecen los registros reales del store.
  const fields = useMemo(
    () =>
      FIELD_DEFS[tab].map((f) => {
        if (f.name === 'empresa') return { ...f, options: data.empresas.map((r) => r.values.nombre) }
        if (f.name === 'psicologo') return { ...f, options: data.psicologos.map((r) => r.values.nombre) }
        return f
      }),
    [tab, data],
  )

  const registros = useMemo(() => data[tab] ?? [], [data, tab])

  const rows = useMemo(
    () =>
      registros
        .map((r) => ({ id: r.id, ...rowFromForm(tab, r.values) }))
        .filter((e) => `${e.nombre} ${e.detalle} ${e.extra ?? ''}`.toLowerCase().includes(search.toLowerCase())),
    [registros, tab, search],
  )

  const setField = (name: string, value: string) =>
    setForm((prev) => ({ ...prev, [name]: value }))

  const formValid = fields.every((f) => !f.required || (form[f.name] ?? '').trim())

  const openCreate = () => {
    setEditingId(null)
    setForm({})
    setModalOpen(true)
  }

  const openEdit = (row: Entidad) => {
    const registro = registros.find((r) => r.id === row.id)
    if (!registro) return
    setEditingId(registro.id)
    setForm({ ...registro.values })
    setModalOpen(true)
  }

  const openView = (row: Entidad) => {
    const registro = registros.find((r) => r.id === row.id)
    if (registro) setViewing(registro)
  }

  const guardar = () => {
    if (!formValid) return
    if (editingId != null) {
      setData((prev) => ({
        ...prev,
        [tab]: prev[tab].map((r) => (r.id === editingId ? { ...r, values: { ...form } } : r)),
      }))
      void swalFire({ icon: 'success', title: 'Actualizado', text: `"${form.nombre}" guardado`, timer: 1500, showConfirmButton: false })
    } else {
      setData((prev) => ({
        ...prev,
        [tab]: [{ id: Date.now(), values: { ...form } }, ...prev[tab]],
      }))
      void swalFire({ icon: 'success', title: 'Creado', text: `"${form.nombre}" agregado`, timer: 1500, showConfirmButton: false })
    }
    setModalOpen(false)
    setForm({})
    setEditingId(null)
  }

  const eliminar = async (row: Entidad) => {
    const result = await alertConfirm(
      '¿Eliminar registro?',
      `"${row.nombre}" se eliminará de forma permanente.`,
    )
    if (!result.isConfirmed) return
    setData((prev) => ({
      ...prev,
      [tab]: prev[tab].filter((r) => r.id !== row.id),
    }))
    void swalFire({ icon: 'success', title: 'Eliminado', timer: 1400, showConfirmButton: false })
  }

  return {
    tab, setTab, search, setSearch, rows,
    modalOpen, setModalOpen, openCreate, openEdit, openView,
    fields, form, setField, formValid, guardar, editingId, viewing, setViewing,
    eliminar,
  }
}
