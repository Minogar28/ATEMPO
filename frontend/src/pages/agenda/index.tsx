import { Stack } from '@mui/material'
import { PageHeader, PageMetaData } from '@src/components'
import { usePermissions } from '@src/hooks/usePermissions'
import { riseInSx } from '@src/theme/brand'

import AgendaConsulta from './views/AgendaConsulta'
import AgendaPaciente from './views/AgendaPaciente'

// El rol elige la vista — el módulo existe una sola vez.
const AgendaPage = () => {
  const { hasRole } = usePermissions()
  const esPaciente = hasRole('paciente')

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Citas" />
      <PageHeader
        title="Citas"
        subtitle={esPaciente ? 'Reserva con tu psicólogo y revisa tus próximas sesiones.' : 'Agenda consolidada de las citas.'}
      />
      {esPaciente ? <AgendaPaciente /> : <AgendaConsulta />}
    </Stack>
  )
}

export default AgendaPage
