import { Link as RouterLink } from 'react-router'
import { Box, Button, Stack, Typography } from '@mui/material'
import { LockRounded } from '@mui/icons-material'
import { glassMustardSx } from '@src/theme/brand'
import { displayFont } from '@src/theme/typography'
import { ContainerBox } from './components'
import { SectionTitle } from './components'

// Privacidad y llamado a la acción final.
const WhatYouGet = () => (
  <ContainerBox sx={{ py: { xs: 6, md: 9 } }}>
    <span id="privacidad" style={{ scrollMarginTop: '5rem' }} />
    <SectionTitle
      name="Privacidad"
      title="Tus datos de salud son tuyos"
      description="Consentimientos granulares, métricas anonimizadas para la empresa y cumplimiento con la Ley 1581 de 2012."
    />
    <Box sx={[glassMustardSx, { borderRadius: 3, p: { xs: 3, md: 4 }, textAlign: 'center' }]}>
      <LockRounded sx={{ fontSize: 28, color: 'primary.main', mb: 1 }} />
      <Typography sx={{ fontFamily: displayFont, fontSize: '1.4rem', mb: 1 }}>
        El detalle clínico solo se comparte contigo y tu psicólogo.
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ maxWidth: 520, mx: 'auto', lineHeight: 1.8, mb: 3 }}
      >
        Cada consentimiento se puede revocar en cualquier momento desde tu perfil.
        La empresa recibe agregados anonimizados; nunca episodios individuales
        ni notas clínicas.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'center' }}>
        <Button component={RouterLink} to="/auth/login" variant="contained" size="large">
          Crear mi espacio
        </Button>
      </Stack>
    </Box>
  </ContainerBox>
)

export default WhatYouGet
