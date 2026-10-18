import { Box, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { SectionLabel } from '@src/components'
import { glassSx } from '@src/theme/brand'
import { monoFont } from '@src/theme/typography'
import { COLOR_CITA, COLOR_DISPONIBLE } from './helper'

// Panel lateral del calendario: leyenda de eventos + instrucciones de uso.

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: 1,
        bgcolor: alpha(color, 0.2),
        border: `1px solid ${alpha(color, 0.5)}`,
        flexShrink: 0,
      }}
    />
    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{label}</Typography>
  </Stack>
)

const AgendaSidePanel = ({ totalBloques }: { totalBloques: number }) => (
  <Stack spacing={2}>
    <Box>
      <SectionLabel>Cómo funciona</SectionLabel>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.7 }}>
        Arrastra sobre un horario para abrir un bloque de disponibilidad; los pacientes podrán
        reservar sus citas sobre esos bloques.
      </Typography>
      <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.7, mt: 1 }}>
        Toca un bloque verde para quitarlo de tu agenda.
      </Typography>
    </Box>

    <Box sx={[glassSx, { borderRadius: 3, p: 1.75 }]}>
      <SectionLabel>Leyenda</SectionLabel>
      <Stack spacing={1}>
        <LegendDot color={COLOR_DISPONIBLE} label="Disponible para reservar" />
        <LegendDot color={COLOR_CITA} label="Cita programada" />
      </Stack>
    </Box>

    <Box sx={[glassSx, { borderRadius: 3, p: 1.75, textAlign: 'center' }]}>
      <Typography sx={{ fontFamily: monoFont, fontSize: '1.4rem', color: 'primary.main' }}>
        {totalBloques}
      </Typography>
      <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Bloques abiertos
      </Typography>
    </Box>
  </Stack>
)

export default AgendaSidePanel
