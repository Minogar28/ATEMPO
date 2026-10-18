import { useState } from 'react'
import { swalFire } from '@src/helpers/alert'
import { downloadCsv, downloadJson } from '@src/helpers/download'
import { fechaCorta } from '@src/helpers/dates'
import { exportPdf } from '@src/helpers/exportPdf'
import { listCitas } from '@src/services/citas.service'
import { listEpisodios } from '@src/services/episodios.service'
import { listGuias } from '@src/services/guias.service'
import { readGestion } from '@src/services/gestion.service'
import { resumenBienestar } from '@src/services/bienestar.service'
import { STORAGE_KEYS } from '@src/config/api'
import type { PreviewPoint, ReportType } from '../types'

const tipos: ReportType[] = [
  { id: 'ejecutivo', nombre: 'Informe ejecutivo', descripcion: 'KPIs globales y empresas del programa', formato: 'PDF' },
  { id: 'estres', nombre: 'Distribución de estrés', descripcion: 'Episodios registrados por nivel y detonante', formato: 'Ambos' },
  { id: 'participacion', nombre: 'Participación', descripcion: 'Uso de módulos y adherencia', formato: 'Excel' },
  { id: 'citas', nombre: 'Ocupación de agenda', descripcion: 'Citas por psicólogo y estado', formato: 'Excel' },
  { id: 'intervencion', nombre: 'Casos de intervención', descripcion: 'Episodios en nivel alto (solo roles clínicos)', formato: 'PDF' },
  { id: 'respaldo', nombre: 'Respaldo de datos', descripcion: 'Todo lo guardado en este navegador (localStorage)', formato: 'JSON' },
]

// Preview derivado de los episodios persistidos: promedio y conteo por semana
// (las últimas 4). Sin registros la gráfica queda vacía — honesto, no inventado.
const buildPreview = (): PreviewPoint[] => {
  const SEMANA = 604800000
  const now = Date.now()
  return [3, 2, 1, 0].map((offset, i) => {
    const min = now - (offset + 1) * SEMANA
    const max = now - offset * SEMANA
    const eps = listEpisodios().filter((e) => e.ts > min && e.ts <= max)
    return {
      periodo: `Sem ${i + 1}`,
      estres: eps.length ? Math.round(eps.reduce((a, e) => a + e.level, 0) / eps.length) : 0,
      episodios: eps.length,
    }
  })
}

const snapshotLocal = () => {
  const data: Record<string, unknown> = {}
  for (const key of Object.values(STORAGE_KEYS)) {
    const raw = localStorage.getItem(key)
    if (raw != null) {
      try { data[key] = JSON.parse(raw) } catch { data[key] = raw }
    }
  }
  return data
}

export const useReportes = () => {
  const [periodo, setPeriodo] = useState('ultimo-mes')
  const [area, setArea] = useState('todas')
  const [empresa, setEmpresa] = useState('todas')
  const [generando, setGenerando] = useState<string | null>(null)

  const generar = async (tipo: ReportType) => {
    setGenerando(tipo.id)
    await new Promise((r) => setTimeout(r, 500))
    const hoy = new Date().toISOString().slice(0, 10)
    const nombreBase = `atempo-${tipo.id}-${hoy}`

    switch (tipo.id) {
      case 'ejecutivo': {
        const gestion = readGestion()
        exportPdf({
          title: 'Informe ejecutivo — ATEMPO',
          fileName: nombreBase,
          columns: [
            { header: 'Empresa', dataKey: 'nombre' },
            { header: 'NIT', dataKey: 'nit' },
            { header: 'Empleados', dataKey: 'empleados' },
            { header: 'Plan', dataKey: 'plan' },
            { header: 'Estado', dataKey: 'estado' },
          ],
          rows: gestion.empresas.map((e) => e.values),
        })
        break
      }
      case 'estres': {
        exportPdf({
          title: 'Distribución de estrés — episodios',
          fileName: nombreBase,
          columns: [
            { header: 'Fecha', dataKey: 'fecha' },
            { header: 'Nivel', dataKey: 'level' },
            { header: 'Estado de ánimo', dataKey: 'mood' },
            { header: 'Detonante', dataKey: 'trigger' },
            { header: 'Nota', dataKey: 'note' },
          ],
          rows: listEpisodios().map((e) => ({ ...e, fecha: fechaCorta(e.ts) })),
        })
        break
      }
      case 'participacion': {
        const resumen = resumenBienestar()
        downloadCsv(
          nombreBase,
          ['Métrica', 'Valor'],
          [
            ['Episodios registrados', resumen.totalEpisodios],
            ['Pausas activas completadas', resumen.totalPausas],
            ['Citas asistidas', resumen.citasAsistidas],
            ['Citas próximas', resumen.citasProximas],
            ['Días con actividad', resumen.diasActivos],
            ['XP acumulado', resumen.xp],
            ['Nivel', resumen.nivel],
            ['Guías publicadas', listGuias().length],
          ],
        )
        break
      }
      case 'citas': {
        downloadCsv(
          nombreBase,
          ['Psicólogo', 'Fecha', 'Hora', 'Modalidad', 'Estado', 'Sala'],
          listCitas().map((c) => [c.psicologo, c.fecha, c.hora, c.modalidad, c.estado, c.meetUrl ?? '']),
        )
        break
      }
      case 'intervencion': {
        exportPdf({
          title: 'Casos de intervención — episodios nivel alto (65+)',
          fileName: nombreBase,
          columns: [
            { header: 'Fecha', dataKey: 'fecha' },
            { header: 'Nivel', dataKey: 'level' },
            { header: 'Estado de ánimo', dataKey: 'mood' },
            { header: 'Detonante', dataKey: 'trigger' },
            { header: 'Nota', dataKey: 'note' },
          ],
          rows: listEpisodios()
            .filter((e) => e.level >= 65)
            .map((e) => ({ ...e, fecha: fechaCorta(e.ts) })),
        })
        break
      }
      case 'respaldo': {
        downloadJson(nombreBase, {
          generado: new Date().toISOString(),
          fuente: 'localStorage',
          data: snapshotLocal(),
        })
        break
      }
    }

    setGenerando(null)
    void swalFire({ icon: 'success', title: 'Reporte descargado', text: `${tipo.nombre} · ${tipo.formato}`, timer: 1600, showConfirmButton: false })
  }

  return { tipos, preview: buildPreview(), periodo, setPeriodo, area, setArea, empresa, setEmpresa, generando, generar }
}
