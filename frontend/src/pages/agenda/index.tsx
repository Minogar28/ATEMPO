import { Box, Stack, Typography } from '@mui/material'
import { PageMetaData } from '@src/components'
import { usePermissions } from '@src/hooks/usePermissions'
import { riseInSx } from '@src/theme/brand'
import { displayFont } from '@src/theme/typography'
import AgendaConsulta from './views/AgendaConsulta'
import AgendaPaciente from './views/AgendaPaciente'

// El rol elige la vista — el módulo existe una sola vez.
const AgendaPage = () => {
  const { hasRole } = usePermissions()
  const esPaciente = hasRole('paciente')

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Citas" />
      <Box>
        <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>Citas</Typography>
        <Typography variant="body2" color="text.secondary">
          {esPaciente ? 'Reserva con tu psicólogo y revisa tus próximas sesiones.' : 'Agenda consolidada de las citas.'}
        </Typography>
      </Box>
      {esPaciente ? <AgendaPaciente /> : <AgendaConsulta />}
    </Stack>
  )
}

export default AgendaPage
