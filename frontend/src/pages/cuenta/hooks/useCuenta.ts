import { useRef, useState } from 'react'
import { useAuth } from '@src/states/AuthContext'
import { swalFire } from '@src/helpers/alert'
import {
  fileToDataUrl,
  getFotoPerfil,
  getLogoEmpresa,
  saveFotoPerfil,
  saveLogoEmpresa,
} from '@src/services/perfil.service'
import type { Consentimiento, FichaItem } from '../types'

export const useCuenta = () => {
  const { user } = useAuth()
  const [tab, setTab] = useState('personal')
  const rol = user?.roles[0] ?? 'paciente'
  const esPaciente = rol === 'paciente'
  const esEmpresa = rol === 'empresa' || rol === 'superadmin'

  // Las pestañas y consentimientos son congruentes con el rol: los datos
  // fisiológicos y el acceso clínico solo aplican al paciente.
  const tabs = [
    { id: 'personal', label: 'Personal' },
    ...(esPaciente ? [{ id: 'fisiologica', label: 'Fisiológica' }] : []),
    { id: 'privacidad', label: 'Privacidad' },
  ]

  const [foto, setFoto] = useState<string | null>(() =>
    user ? getFotoPerfil(user.id) : null,
  )
  const [logoEmpresa, setLogoEmpresa] = useState<string | null>(getLogoEmpresa)
  const fotoInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const subirArchivo = async (file: File | undefined, guardar: (dataUrl: string) => void, titulo: string) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      void swalFire({ icon: 'warning', title: 'Archivo inválido', text: 'Elige una imagen (PNG o JPG).' })
      return
    }
    if (file.size > 800 * 1024) {
      void swalFire({ icon: 'warning', title: 'Imagen muy pesada', text: 'Usa una imagen de menos de 800 KB.' })
      return
    }
    try {
      const dataUrl = await fileToDataUrl(file)
      guardar(dataUrl)
      void swalFire({ icon: 'success', title: titulo, timer: 1400, showConfirmButton: false })
    } catch {
      void swalFire({ icon: 'error', title: 'No se pudo cargar la imagen' })
    }
  }

  const subirFoto = (file: File | undefined) => {
    if (!user) return
    void subirArchivo(file, (dataUrl) => { saveFotoPerfil(user.id, dataUrl); setFoto(dataUrl) }, 'Foto actualizada')
  }

  const subirLogo = (file: File | undefined) => {
    void subirArchivo(file, (dataUrl) => { saveLogoEmpresa(dataUrl); setLogoEmpresa(dataUrl) }, 'Logo actualizado')
  }

  const personal: FichaItem[] = [
    { label: 'Nombre completo', valor: user?.name ?? '—' },
    { label: 'Correo', valor: user?.email ?? '—' },
    { label: 'Cédula', valor: user?.cedula ?? '—' },
    { label: 'Empresa', valor: user?.empresa ?? '—' },
    { label: 'Rol', valor: user?.roles.join(', ') ?? '—' },
  ]

  const fisiologica: FichaItem[] = [
    { label: 'FC en reposo', valor: '72 bpm' },
    { label: 'HRV habitual', valor: '58 ms' },
    { label: 'Temperatura basal', valor: '36.4 °C' },
    { label: 'SpO₂ habitual', valor: '98 %' },
  ]

  const [consentimientos, setConsentimientos] = useState<Consentimiento[]>(() =>
    esPaciente
      ? [
          { id: 'datos', label: 'Tratamiento de datos', descripcion: 'Uso de datos personales para el programa de bienestar', activo: true },
          { id: 'biometria', label: 'Datos biométricos', descripcion: 'Recolección de signos vitales desde CAREband', activo: true },
          { id: 'empresa', label: 'Métricas agregadas', descripcion: 'Compartir datos anonimizados en reportes de empresa', activo: true },
          { id: 'clinico', label: 'Acceso clínico', descripcion: 'Mi psicólogo puede ver mi detalle clínico', activo: false },
        ]
      : [
          { id: 'datos', label: 'Tratamiento de datos', descripcion: 'Uso de datos personales para operar la plataforma', activo: true },
          { id: 'agregados', label: 'Datos agregados', descripcion: 'Generación de métricas anonimizadas del programa', activo: true },
        ],
  )

  const toggleConsent = (id: string) => {
    setConsentimientos((prev) => prev.map((c) => (c.id === id ? { ...c, activo: !c.activo } : c)))
    void swalFire({ icon: 'success', title: 'Preferencia guardada', timer: 1200, showConfirmButton: false })
  }

  return {
    user, tab, setTab, tabs, personal, fisiologica, consentimientos, toggleConsent,
    foto, subirFoto, fotoInputRef,
    esEmpresa, logoEmpresa, subirLogo, logoInputRef,
  }
}
