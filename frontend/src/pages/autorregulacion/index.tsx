import { Box, Button, Grid, Paper, Slider, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { ArrowBackRounded, PlayArrowRounded } from '@mui/icons-material'
import { PageMetaData, SectionLabel, VideoPlayerDialog } from '@src/components'
import { glassMustardSx, glassSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { stressColor } from '@src/theme/status'
import { youtubeThumb } from '@src/services/guias.service'
import { useAutorregulacion } from './hooks/useAutorregulacion'
import { EMOTIONS } from './types'

const BREATH_LABELS = ['Inhala', 'Retén', 'Exhala']

const MeasureStep = ({ value, onChange, onNext, label }: {
  value: number
  onChange: (v: number) => void
  onNext: () => void
  label: string
}) => (
  <Stack spacing={3} sx={{ alignItems: "center" }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography sx={{ fontFamily: monoFont, fontSize: '3rem', color: stressColor(value), lineHeight: 1 }}>
      {value}
    </Typography>
    <Slider value={value} onChange={(_, v) => onChange(v as number)} min={0} max={100} sx={{ maxWidth: 320 }} />
    <Button variant="contained" onClick={onNext}>Continuar</Button>
  </Stack>
)

const AutorregulacionPage = () => {
  const {
    step, start, next, finish,
    antes, setAntes, despues, setDespues,
    emocion, setEmocion, breathPhase, timer,
    guiasBib, guiaActiva, setGuiaActiva,
    videoGuias, playing, setPlaying,
  } = useAutorregulacion()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Autorregulación" />

      <Box>
        <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>Autorregulación</Typography>
        <Typography variant="body2" color="text.secondary">
          Pausas guiadas para volver a tu centro.
        </Typography>
      </Box>

      {/* Flujo PAUSA */}
      <Paper sx={{ p: { xs: 3, md: 4 }, minHeight: 320, display: 'grid', placeItems: 'center' }}>
        {step === 'idle' && guiaActiva && (
          <Stack spacing={2.5} sx={{ alignItems: 'stretch', width: '100%', maxWidth: 460 }}>
            <Box>
              <Typography sx={{ fontSize: '0.62rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {guiaActiva.categoria} · {guiaActiva.duracion}
              </Typography>
              <Typography sx={{ fontFamily: displayFont, fontSize: '1.35rem', mt: 0.5 }}>
                {guiaActiva.titulo}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {guiaActiva.descripcion}
              </Typography>
            </Box>
            <Stack spacing={1.25}>
              {guiaActiva.pasos.map((paso, i) => (
                <Stack key={i} direction="row" spacing={1.25} sx={{ alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: alpha('#E2B84A', 0.15),
                      border: '1px solid rgba(226,184,74,0.35)',
                    }}
                  >
                    <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'primary.main' }}>
                      {i + 1}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ pt: 0.15 }}>{paso}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'center', pt: 0.5 }}>
              <Button variant="outlined" startIcon={<ArrowBackRounded />} onClick={() => setGuiaActiva(null)}>
                Volver
              </Button>
              <Button variant="contained" startIcon={<PlayArrowRounded />} onClick={() => start(guiaActiva)}>
                Iniciar pausa guiada
              </Button>
            </Stack>
          </Stack>
        )}

        {step === 'idle' && !guiaActiva && (
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Box
              onClick={() => start()}
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, rgba(226,184,74,0.2), rgba(226,184,74,0.05))',
                border: '1px solid rgba(226,184,74,0.35)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '1px solid rgba(226,184,74,0.4)',
                  animation: 'pulseRing 2.4s ease-out infinite',
                },
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <PlayArrowRounded sx={{ fontSize: 28, color: 'primary.main' }} />
                <Typography sx={{ fontFamily: displayFont, fontSize: '1.2rem' }}>PAUSA</Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Toca para iniciar una pausa activa guiada.
            </Typography>
          </Stack>
        )}

        {step === 'medir' && (
          <MeasureStep label="¿Cuál es tu nivel de tensión ahora?" value={antes} onChange={setAntes} onNext={next} />
        )}

        {step === 'respirar' && (
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">Respiración 4-7-8 — sigue el círculo</Typography>
            <Box
              sx={{
                width: 170,
                height: 170,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: `radial-gradient(circle, ${alpha('#60a5fa', 0.25)}, transparent 70%)`,
                border: '2px solid rgba(96,165,250,0.4)',
                animation: 'breathe 4s ease-in-out infinite',
              }}
            >
              <Typography sx={{ fontFamily: displayFont, fontSize: '1.4rem', color: '#93c5fd' }}>
                {BREATH_LABELS[breathPhase]}
              </Typography>
            </Box>
            <Button variant="outlined" onClick={next}>Siguiente</Button>
          </Stack>
        )}

        {step === 'relajar' && (
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Relájate. Deja que la activación baje sola.
            </Typography>
            <Typography sx={{ fontFamily: monoFont, fontSize: '2.6rem', color: 'primary.main' }}>
              {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}
            </Typography>
            <Button variant="outlined" onClick={next}>
              {timer > 0 ? 'Saltar' : 'Continuar'}
            </Button>
          </Stack>
        )}

        {step === 'emocion' && (
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">¿Cómo te sientes ahora?</Typography>
            <Stack direction="row" spacing={1.5}>
              {EMOTIONS.map((e) => (
                <Box
                  key={e}
                  component="button"
                  onClick={() => { setEmocion(e); next() }}
                  sx={[
                    glassMustardSx,
                    {
                      borderRadius: 999,
                      px: 2.5,
                      py: 1.25,
                      cursor: 'pointer',
                      fontFamily: '"Outfit", sans-serif',
                      fontSize: '0.85rem',
                      color: emocion === e ? '#0C1F3C' : '#FAF6ED',
                      '&:hover': { borderColor: 'rgba(226,184,74,0.6)' },
                    },
                  ]}
                >
                  {e}
                </Box>
              ))}
            </Stack>
          </Stack>
        )}

        {step === 'medir2' && (
          <MeasureStep label="¿Y tu nivel de tensión ahora?" value={despues} onChange={setDespues} onNext={next} />
        )}

        {step === 'resultado' && (
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">Resultado de tu pausa</Typography>
            <Stack direction="row" spacing={4} sx={{ alignItems: "baseline" }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: monoFont, fontSize: '2rem', color: stressColor(antes) }}>{antes}</Typography>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase' }}>Antes</Typography>
              </Box>
              <Typography sx={{ fontSize: '1.2rem', color: 'text.secondary' }}>→</Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontFamily: monoFont, fontSize: '2rem', color: stressColor(despues) }}>{despues}</Typography>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase' }}>Después</Typography>
              </Box>
            </Stack>
            <Typography variant="body2" color={despues < antes ? '#4ade80' : 'text.secondary'}>
              {despues < antes ? `Bajaste ${antes - despues} puntos de activación.` : 'Sigue practicando — la constancia regula.'}
            </Typography>
            <Button variant="contained" onClick={finish}>Terminar</Button>
          </Stack>
        )}
      </Paper>

      {/* Guías en video publicadas por el psicólogo */}
      {videoGuias.length > 0 && (
        <Box>
          <SectionLabel>Guías en video de tu psicólogo</SectionLabel>
          <Grid container spacing={2}>
            {videoGuias.map((g) => (
              <Grid key={g.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  component="button"
                  onClick={() => setPlaying(g)}
                  sx={[
                    glassSx,
                    {
                      borderRadius: 4,
                      overflow: 'hidden',
                      p: 0,
                      border: '1px solid rgba(255,255,255,0.11)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      fontFamily: 'inherit',
                      transition: 'transform 0.2s, border-color 0.2s',
                      '&:hover': { transform: 'translateY(-2px)', borderColor: 'rgba(226,184,74,0.35)' },
                    },
                  ]}
                >
                  <Box sx={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                    <Box
                      component="img"
                      src={youtubeThumb(g.videoId)}
                      alt={g.titulo}
                      loading="lazy"
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'grid',
                        placeItems: 'center',
                        background: 'rgba(12,31,60,0.35)',
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          background: 'linear-gradient(135deg, #E2B84A, #c9a035)',
                          boxShadow: '0 0 24px rgba(226,184,74,0.4)',
                        }}
                      >
                        <PlayArrowRounded sx={{ fontSize: 22, color: '#0C1F3C' }} />
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ p: 1.5 }}>
                    <Typography sx={{ fontSize: '0.6rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {g.categoria}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3, mt: 0.25 }}>
                      {g.titulo}
                    </Typography>
                    <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled', mt: 0.25 }}>
                      {g.duracion} · {g.creadoPor}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Biblioteca de guías paso a paso — las publica el psicólogo */}
      <Box>
        <SectionLabel>Biblioteca de guías</SectionLabel>
        <Grid container spacing={2}>
          {guiasBib.map((g) => (
            <Grid key={g.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <Paper
                component="button"
                onClick={() => setGuiaActiva(g)}
                sx={{
                  p: 2,
                  height: '100%',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  color: 'inherit',
                  border: guiaActiva?.id === g.id ? '1px solid rgba(226,184,74,0.5)' : '1px solid rgba(255,255,255,0.11)',
                  transition: 'border-color 0.2s, transform 0.2s',
                  '&:hover': { transform: 'translateY(-2px)', borderColor: 'rgba(226,184,74,0.35)' },
                }}
              >
                <Typography sx={{ fontSize: '0.62rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 0.5 }}>
                  {g.categoria}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{g.titulo}</Typography>
                <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled', mt: 0.5 }}>
                  {g.duracion} · {g.creadoPor}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Reproductor embebido (compartido con la vista previa del psicólogo) */}
      <VideoPlayerDialog guia={playing} onClose={() => setPlaying(null)} />
    </Stack>
  )
}

export default AutorregulacionPage
