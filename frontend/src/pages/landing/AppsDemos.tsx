import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { Gauge, StressBar } from '@src/components'
import { glassMustardSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { ContainerBox } from './components'
import { SectionTitle } from './components'

// Sección "Experiencia": qué se siente usar ATEMPO en el día a día.
const AppsDemos = () => (
  <ContainerBox sx={{ py: { xs: 6, md: 9 } }}>
    <span id="experiencia" style={{ scrollMarginTop: '5rem' }} />
    <SectionTitle
      name="La experiencia"
      title="Del sensor a la calma"
      description="La banda lee tu fisiología, el semáforo la traduce y la pausa te devuelve al verde."
    />
    <Grid container spacing={3} sx={{ alignItems: 'stretch' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography sx={{ fontFamily: displayFont, fontSize: '1.15rem', mb: 0.5 }}>
            Monitoreo continuo
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.7, mb: 2.5 }}>
            Tus signos se convierten en un nivel de estrés comprensible — con
            tendencia, contexto y evolución semanal.
          </Typography>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Gauge value={47} size={110} label="Estrés" />
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              {[
                ['Mañana', 38],
                ['Tarde', 55],
                ['Noche', 47],
              ].map(([label, value]) => (
                <Box key={label}>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>
                    {label}
                  </Typography>
                  <StressBar value={value as number} height={5} />
                </Box>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={[glassMustardSx, { borderRadius: 3, p: 3, height: '100%' }]}>
          <Typography sx={{ fontFamily: displayFont, fontSize: '1.15rem', mb: 0.5 }}>
            Pausa activa guiada
          </Typography>
          <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.7, mb: 2.5 }}>
            Seis pasos consciente-respiración-ancaje que toman menos de tres
            minutos y quedan registrados en tu avatar.
          </Typography>
          <Stack spacing={1.25}>
            {[
              ['1', 'Detecta la señal'],
              ['2', 'Respira 4-7-8'],
              ['3', 'Nombra la emoción'],
              ['4', 'Ancla el cuerpo'],
              ['5', 'Re-evalúa tu nivel'],
              ['6', 'Regresa al verde'],
            ].map(([n, step]) => (
              <Stack key={n} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '8px',
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: 'rgba(226,184,74,0.12)',
                    border: '1px solid rgba(226,184,74,0.3)',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.68rem', color: 'primary.main' }}>
                    {n}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.78rem' }}>{step}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  </ContainerBox>
)

export default AppsDemos
