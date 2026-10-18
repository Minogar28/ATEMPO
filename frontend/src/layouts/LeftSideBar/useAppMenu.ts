import { useMemo } from 'react'
import type { MenuSection } from '@src/helpers/menu'
import { iconoModulo } from '@src/helpers/permissions'
import { usePermissions } from '@src/hooks/usePermissions'
import type { MenuSection as SectionName } from '@src/routes/modules'

const SECTION_ORDER: SectionName[] = ['Paciente', 'Profesional', 'Cuenta']

// El menú se deriva del registro de módulos: misma fuente que rutas y permisos.
export const useAppMenu = (): MenuSection[] => {
  const { visibleModules } = usePermissions()

  return useMemo(
    () =>
      SECTION_ORDER.map((label) => ({
        label,
        items: visibleModules
          .filter((m) => m.section === label)
          .map((m) => ({
            key: m.key,
            label: m.label,
            path: m.path,
            icon: iconoModulo(m.key),
          })),
      })).filter((s) => s.items.length > 0),
    [visibleModules],
  )
}
