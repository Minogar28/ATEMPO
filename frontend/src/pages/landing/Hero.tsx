import { Link as RouterLink } from 'react-router'
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { KeyboardArrowDownRounded, MonitorHeartRounded } from '@mui/icons-material'
import { SectionLabel, StressRing } from '@src/components'
import { glassSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { ContainerBox } from './components'

const Hero = () => (
  <Box id="hero" sx={{ position: 'relative', pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
    <ContainerBox>
      <Grid container spacing={4} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={3}>
            <Box>
              <SectionLabel>Bienestar psicofisiológico</SectionLabel>
              <Typography
                sx={{
                  fontFamily: displayFont,
                  fontSize: { xs: '2.2rem', md: '3rem' },
                  lineHeight: 1.15,
                }}
              >
                Lee tu estrés antes de que te lea a ti.
              </Typography>
            </Box>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 480, lineHeight: 1.8, fontSize: '0.95rem' }}
            >
              ATEMPO conecta la banda CAREband, la autorregulación guiada y el
              acompañamiento psicológico en una sola plataforma — para personas,
              psicólogos y empresas.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Button
                component={RouterLink}
                to="/auth/login"
                variant="contained"
                size="large"
              >
                Entrar a mi espacio
              </Button>
              <Button
                href="#modulos"
                variant="text"
                size="large"
                endIcon={<KeyboardArrowDownRounded />}
                sx={{ color: 'text.secondary' }}
              >
                Conocer la plataforma
              </Button>
            </Stack>
            <Stack direction="row" spacing={3} sx={{ pt: 1 }}>
              {[
                ['4', 'roles en una app'],
                ['6', 'pasos de autorregulación'],
                ['24/7', 'monitoreo CAREband'],
              ].map(([n, label]) => (
                <Box key={label}>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '1.3rem', color: 'primary.main' }}>
                    {n}
                  </Typography>
                  <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Grid>

        {/* Vista previa: anillo de estrés + métricas en vivo */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto' }}>
            <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
              <StressRing level={47} size={120} />
              <Stack spacing={1.25} sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Ahora mismo
                </Typography>
                {[
                  ['FC', '72 bpm'],
                  ['HRV', '58 ms'],
                  ['EDA', '3.2 µS'],
                ].map(([label, value]) => (
                  <Stack key={label} direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{label}</Typography>
                    <Typography sx={{ fontFamily: monoFont, fontSize: '0.78rem' }}>{value}</Typography>
                  </Stack>
                ))}
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', pt: 0.5 }}>
                  <MonitorHeartRounded sx={{ fontSize: 14, color: '#4ade80' }} />
                  <Typography sx={{ fontSize: '0.62rem', color: '#4ade80' }}>
                    CAREband conectada
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box sx={[glassSx, { mt: 2.5, borderRadius: 2.5, p: 1.75 }]}>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', lineHeight: 1.6 }}>
                «Activación moderada — una pausa de 3 minutos puede bajar tu FC hasta 8 latidos.»
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ContainerBox>
  </Box>
)

export default Hero
