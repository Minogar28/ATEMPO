import { STORAGE_KEYS } from '@src/config/api'

// Guías en video que el psicólogo publica y el paciente consume en
// Autorregulación. Mock persistido en localStorage hasta que exista backend —
// el contrato (campos) ya es el que se enviará a la API.

export interface VideoGuia {
  id: string
  titulo: string
  youtubeUrl: string
  videoId: string
  categoria: string
  duracion: string
  descripcion: string
  creadoPor: string
  creadoEn: string
}

export interface NuevaVideoGuia {
  titulo: string
  youtubeUrl: string
  categoria: string
  duracion: string
  descripcion: string
  creadoPor: string
}

export const CATEGORIAS_GUIA = [
  'Respiración',
  'Mindfulness',
  'Relajación',
  'Ansiedad',
  'Psicoeducación',
  'Físico',
] as const

// Acepta watch?v=, youtu.be/, /shorts/, /embed/ y URLs con parámetros extra.
export const extractYoutubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?[^#]*v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  )
  return match?.[1] ?? null
}

export const youtubeThumb = (videoId: string): string =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

export const youtubeEmbed = (videoId: string): string =>
  `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`

// Sin seed: los videos los publica el psicólogo con links reales de YouTube.
const SEED: VideoGuia[] = []

const read = (): VideoGuia[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.guias)
    if (raw == null) return SEED
    return JSON.parse(raw) as VideoGuia[]
  } catch {
    return SEED
  }
}

const write = (guias: VideoGuia[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.guias, JSON.stringify(guias))
  } catch {
    // localStorage lleno o bloqueado: el estado en memoria igual responde
  }
}

export const listGuias = (): VideoGuia[] => read()

export const createGuia = (input: NuevaVideoGuia): VideoGuia => {
  const videoId = extractYoutubeId(input.youtubeUrl)
  if (!videoId) throw new Error('URL de YouTube no válida')
  const guia: VideoGuia = {
    ...input,
    id: `guia-${Date.now()}`,
    videoId,
    creadoEn: new Date().toISOString().slice(0, 10),
  }
  write([guia, ...read()])
  return guia
}

export const updateGuia = (id: string, input: NuevaVideoGuia): VideoGuia => {
  const videoId = extractYoutubeId(input.youtubeUrl)
  if (!videoId) throw new Error('URL de YouTube no válida')
  const guias = read()
  const idx = guias.findIndex((g) => g.id === id)
  if (idx < 0) throw new Error('Guía no encontrada')
  const updated: VideoGuia = { ...guias[idx], ...input, videoId }
  guias[idx] = updated
  write(guias)
  return updated
}

export const deleteGuia = (id: string) => {
  write(read().filter((g) => g.id !== id))
}

// ─── Guías de biblioteca (paso a paso) ───────────────────────────────────────
// Texto/estructura — se muestran en Autorregulación dentro de la zona PAUSA.

export interface GuiaBiblioteca {
  id: string
  titulo: string
  categoria: string
  duracion: string
  descripcion: string
  pasos: string[] // un paso por línea en el formulario
  creadoPor: string
  creadoEn: string
}

export interface NuevaGuiaBiblioteca {
  titulo: string
  categoria: string
  duracion: string
  descripcion: string
  pasos: string[]
  creadoPor: string
}

const BIB_KEY = `${STORAGE_KEYS.guias}.biblioteca`

const BIB_SEED: GuiaBiblioteca[] = [
  {
    id: 'bib-1',
    titulo: 'Respiración 4-7-8',
    categoria: 'Respiración',
    duracion: '5 min',
    descripcion: 'La técnica más rápida para bajar la activación fisiológica.',
    pasos: [
      'Siéntate con la espalda apoyada y los pies en el suelo.',
      'Inhala por la nariz contando 4 segundos.',
      'Retén el aire contando 7 segundos.',
      'Exhala por la boca contando 8 segundos.',
      'Repite el ciclo 3 veces y observa tu nivel de tensión.',
    ],
    creadoPor: 'ATEMPO',
    creadoEn: '2026-01-01',
  },
  {
    id: 'bib-2',
    titulo: 'Escaneo corporal',
    categoria: 'Mindfulness',
    duracion: '10 min',
    descripcion: 'Recorre el cuerpo con atención para soltar tensión acumulada.',
    pasos: [
      'Cierra los ojos y lleva la atención a los pies.',
      'Sube lentamente por piernas, abdomen, pecho y hombros.',
      'En cada zona, nota la tensión sin intentar cambiarla.',
      'Al exhalar, imagina que esa zona se relaja.',
      'Termina con 3 respiraciones profundas.',
    ],
    creadoPor: 'ATEMPO',
    creadoEn: '2026-01-01',
  },
  {
    id: 'bib-3',
    titulo: 'Relajación muscular progresiva',
    categoria: 'Relajación',
    duracion: '12 min',
    descripcion: 'Tensa y suelta grupos musculares para liberar la carga física.',
    pasos: [
      'Tensa los puños 5 segundos y suelta por completo.',
      'Repite con hombros, rostro y abdomen.',
      'Nota la diferencia entre tensión y relajación.',
      'Termina relajando todo el cuerpo 30 segundos.',
    ],
    creadoPor: 'ATEMPO',
    creadoEn: '2026-01-01',
  },
  {
    id: 'bib-4',
    titulo: 'Grounding 5-4-3-2-1',
    categoria: 'Ansiedad',
    duracion: '4 min',
    descripcion: 'Ancla al presente usando los cinco sentidos — ideal para picos de ansiedad.',
    pasos: [
      'Nombra 5 cosas que puedes ver a tu alrededor.',
      'Nombra 4 cosas que puedes tocar.',
      'Nombra 3 sonidos que puedes escuchar.',
      'Nombra 2 olores que puedes percibir.',
      'Nombra 1 cosa que puedes saborear.',
    ],
    creadoPor: 'ATEMPO',
    creadoEn: '2026-01-01',
  },
  {
    id: 'bib-5',
    titulo: 'Visualización segura',
    categoria: 'Mindfulness',
    duracion: '8 min',
    descripcion: 'Imagina un lugar seguro para calmar el sistema nervioso.',
    pasos: [
      'Cierra los ojos y respira profundo dos veces.',
      'Imagina un lugar donde te sientes en calma.',
      'Observa sus colores, sonidos y temperatura.',
      'Quédate ahí 5 respiraciones y regresa suavemente.',
    ],
    creadoPor: 'ATEMPO',
    creadoEn: '2026-01-01',
  },
  {
    id: 'bib-6',
    titulo: 'Estiramiento de cuello y hombros',
    categoria: 'Físico',
    duracion: '6 min',
    descripcion: 'Libera la tensión física de las pantallas y la postura.',
    pasos: [
      'Inclina la cabeza hacia un hombro 20 segundos por lado.',
      'Gira los hombros hacia atrás 10 veces.',
      'Junta las manos atrás y abre el pecho 20 segundos.',
      'Termina con 3 respiraciones profundas.',
    ],
    creadoPor: 'ATEMPO',
    creadoEn: '2026-01-01',
  },
]

const readBib = (): GuiaBiblioteca[] => {
  try {
    const raw = localStorage.getItem(BIB_KEY)
    if (raw == null) {
      localStorage.setItem(BIB_KEY, JSON.stringify(BIB_SEED))
      return BIB_SEED
    }
    const parsed = JSON.parse(raw) as GuiaBiblioteca[]
    return Array.isArray(parsed) ? parsed : BIB_SEED
  } catch {
    return BIB_SEED
  }
}

const writeBib = (guias: GuiaBiblioteca[]) => {
  try {
    localStorage.setItem(BIB_KEY, JSON.stringify(guias))
  } catch {
    // localStorage lleno o bloqueado
  }
}

export const listGuiasBib = (): GuiaBiblioteca[] => readBib()

export const createGuiaBib = (input: NuevaGuiaBiblioteca): GuiaBiblioteca => {
  const guia: GuiaBiblioteca = {
    ...input,
    pasos: input.pasos.filter((p) => p.trim()),
    id: `bib-${Date.now()}`,
    creadoEn: new Date().toISOString().slice(0, 10),
  }
  writeBib([guia, ...readBib()])
  return guia
}

export const updateGuiaBib = (id: string, input: NuevaGuiaBiblioteca): GuiaBiblioteca => {
  const guias = readBib()
  const idx = guias.findIndex((g) => g.id === id)
  if (idx < 0) throw new Error('Guía no encontrada')
  const updated: GuiaBiblioteca = {
    ...guias[idx],
    ...input,
    pasos: input.pasos.filter((p) => p.trim()),
  }
  guias[idx] = updated
  writeBib(guias)
  return updated
}

export const deleteGuiaBib = (id: string) => {
  writeBib(readBib().filter((g) => g.id !== id))
}
