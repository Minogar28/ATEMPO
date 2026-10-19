import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { AddRounded, DeleteRounded, EditRounded, EventBusyRounded, FormatListNumberedRounded, GroupsRounded, PlayArrowRounded, SearchRounded, TipsAndUpdatesRounded, VideocamRounded, VisibilityRounded } from '@mui/icons-material'
import { EmptyState, PageHeader, PageMetaData, SectionLabel, SegmentedTabs, StatCard, StressBar, VideoPlayerDialog } from '@src/components'
import { glassSx, riseInSx } from '@src/theme/brand'
import { monoFont } from '@src/theme/typography'
import { stressColor } from '@src/theme/status'
import { signosDe } from '@src/services/signos.service'
import { TIP_CONTEXTOS } from '@src/services/tips.service'
import type { TipContexto } from '@src/services/tips.service'
import { CATEGORIAS_GUIA, youtubeThumb } from '@src/services/guias.service'
import AgendaCalendario from '@src/components/Calendar'
import SesionVirtual from '@src/pages/agenda/views/SesionVirtual'
import { useMiPanel } from './hooks/useMiPanel'

const ESTADO_COLOR: Record<string, string> = {
  confirmada: '#4ade80',
  pendiente: '#E2B84A',
  completada: '#60a5fa',
  cancelada: '#f87171',
}

const MiPanelPage = () => {
  const {
    tab, setTab,
    bloques, citasEventos, abrirBloque, quitarBloque,
    pacientes, citasHoy, stats,
    search, setSearch,
    guias, guiaModal, setGuiaModal, openGuiaModal,
    guiaForm, setGuiaField, videoId, guiaValid, guardarGuia, eliminarGuia,
    tipoGuia, editingGuiaId, previewGuia, setPreviewGuia,
    guiasBib, openBibModal, eliminarGuiaBib, editingBibId, previewBib, setPreviewBib,
    tips, tipModal, setTipModal, tipForm, setTipForm,
    openTipModal, guardarTip, eliminarTip, tipValid, editingTipId,
    pacienteView, setPacienteView,
    sesion, iniciarCita, finalizarSesion, verDetalleCita,
  } = useMiPanel()

  if (sesion) return <SesionVirtual cita={sesion} onFinalizar={finalizarSesion} />

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Mi Panel" />

      <PageHeader title="Mi Panel" subtitle="Tu agenda, citas y pacientes en un solo lugar." />

      <Grid container spacing={2}>
        {stats.map((s) => (
          <Grid key={s.label} size={{ xs: 6, md: 3 }}>
            <Paper sx={{ p: 1.25 }}>
              <StatCard value={s.value} label={s.label} tooltip={s.tip} />
            </Paper>
          </Grid>
        ))}
      </Grid>

      <SegmentedTabs
        tabs={[
          { id: 'agenda', label: 'Mi agenda' },
          { id: 'citas', label: 'Citas' },
          { id: 'pacientes', label: 'Pacientes' },
          { id: 'guias', label: 'Guías' },
          { id: 'tips', label: 'Tips' },
        ]}
        value={tab}
        onChange={(id) => { setTab(id); setSearch('') }}
      />

      {(tab === 'citas' || tab === 'pacientes' || tab === 'guias' || tab === 'tips') && (
        <TextField
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Buscar en ${tab}…`}
          slotProps={{ input: { startAdornment: <SearchRounded sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} /> } }}
          sx={{ maxWidth: 340 }}
        />
      )}

      {tab === 'agenda' && (
        <Box>
          <SectionLabel>Disponibilidad — arrastra para abrir, toca un bloque para quitarlo</SectionLabel>
          <AgendaCalendario
            bloques={bloques}
            citas={citasEventos}
            onAbrir={abrirBloque}
            onQuitar={quitarBloque}
          />
        </Box>
      )}

      {tab === 'citas' && (
        <Paper sx={{ p: 2.5 }}>
          <SectionLabel>Citas de hoy</SectionLabel>
          <Stack spacing={1.5}>
            {citasHoy.map((c) => (
              <Box
                key={c.id}
                sx={[glassSx, { borderRadius: 3, px: 2.25, py: 1.75 }]}
              >
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.78rem', color: 'text.secondary', width: 48 }}>
                    {c.hora}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.paciente}</Typography>
                    <Box sx={{ width: 110, mt: 0.5 }}>
                      <StressBar value={c.estresPaciente} height={3} showValue={false} />
                    </Box>
                  </Box>
                  <Chip
                    size="small"
                    label={c.estado}
                    sx={{
                      bgcolor: alpha(ESTADO_COLOR[c.estado], 0.12),
                      color: ESTADO_COLOR[c.estado],
                      fontSize: '0.62rem',
                      height: 22,
                    }}
                  />
                  <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
                    <Tooltip title="Ver detalle del paciente">
                      <IconButton size="small" onClick={() => verDetalleCita(c)} aria-label={`Ver detalle de ${c.paciente}`}>
                        <VisibilityRounded sx={{ fontSize: 16, color: 'text.secondary' }} />
                      </IconButton>
                    </Tooltip>
                    {c.estado !== 'completada' && c.estado !== 'cancelada' && (
                      <Tooltip title="Iniciar videollamada">
                        <IconButton size="small" onClick={() => iniciarCita(c)} aria-label={`Iniciar cita con ${c.paciente}`}>
                          <VideocamRounded sx={{ fontSize: 17, color: 'primary.main' }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </Stack>
              </Box>
            ))}
            {citasHoy.length === 0 && (
              <EmptyState
                icon={EventBusyRounded}
                title="Sin citas para hoy"
                description="Abre bloques en Mi agenda para que los pacientes reserven."
              />
            )}
          </Stack>
        </Paper>
      )}

      {tab === 'pacientes' && (
        <Paper sx={{ p: 2.5 }}>
          <SectionLabel>Pacientes asignados</SectionLabel>
          <Stack spacing={1.5}>
            {pacientes.map((p) => (
              <Box key={p.id} sx={[glassSx, { borderRadius: 3, px: 2.25, py: 1.75 }]}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar sx={{ width: 36, height: 36, fontSize: '0.8rem' }}>{p.nombre.slice(0, 1)}</Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{p.nombre}</Typography>
                    <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }} noWrap>
                      {p.empresa} · Últ. cita {p.ultimaCita}{p.nota ? ` · ${p.nota}` : ''}
                    </Typography>
                  </Box>
                  <Box sx={{ width: 110 }}>
                    <StressBar value={p.estres} label="Estrés" />
                  </Box>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.75rem', color: stressColor(p.estres), width: 26, textAlign: 'right' }}>
                    {p.estres}
                  </Typography>
                  <Tooltip title="Ver detalle">
                    <IconButton size="small" onClick={() => setPacienteView(p)} aria-label={`Ver ${p.nombre}`}>
                      <VisibilityRounded sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            ))}
            {pacientes.length === 0 && (
              <EmptyState
                icon={GroupsRounded}
                title="Sin pacientes asignados"
                description="Cuando te asignen pacientes aparecerán aquí con su nivel de estrés."
              />
            )}
          </Stack>
        </Paper>
      )}

      {tab === 'guias' && (
        <>
        <Paper sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <SectionLabel>Biblioteca de videos para pacientes · {guias.length}</SectionLabel>
            <Button size="small" variant="contained" startIcon={<PlayArrowRounded />} onClick={() => openGuiaModal()}>
              Nuevo video
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', mb: 1.5 }}>
            Enlaces de YouTube que el paciente reproduce dentro de Autorregulación.
          </Typography>
          {guias.length === 0 ? (
            <EmptyState
              icon={PlayArrowRounded}
              title="Aún no publicas videos"
              description="Pega un enlace de YouTube para crear la primera guía en video."
              actionLabel="Nuevo video"
              onAction={() => openGuiaModal()}
            />
          ) : (
            <Grid container spacing={2}>
              {guias.map((g) => (
                <Grid key={g.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={[glassSx, { borderRadius: 3, overflow: 'hidden' }]}>
                    <Box sx={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                      <Box
                        component="img"
                        src={youtubeThumb(g.videoId)}
                        alt={g.titulo}
                        loading="lazy"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <Box
                        component="button"
                        onClick={() => setPreviewGuia(g)}
                        aria-label={`Reproducir ${g.titulo}`}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          display: 'grid',
                          placeItems: 'center',
                          background: 'rgba(12,31,60,0.35)',
                          border: 0,
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          '&:hover': { background: 'rgba(12,31,60,0.2)' },
                        }}
                      >
                        <PlayArrowRounded sx={{ fontSize: 34, color: 'rgba(250,246,237,0.85)' }} />
                      </Box>
                    </Box>
                    <Box sx={{ p: 1.5 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontSize: '0.6rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {g.categoria}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }} noWrap>
                            {g.titulo}
                          </Typography>
                          <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled', mt: 0.25 }}>
                            {g.duracion} · {g.creadoPor}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
                          <Tooltip title="Vista previa">
                            <IconButton size="small" onClick={() => setPreviewGuia(g)} aria-label={`Ver ${g.titulo}`}>
                              <VisibilityRounded sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar guía">
                            <IconButton size="small" onClick={() => openGuiaModal(g)} aria-label={`Editar ${g.titulo}`}>
                              <EditRounded sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar guía">
                            <IconButton size="small" onClick={() => void eliminarGuia(g.id)} aria-label={`Eliminar ${g.titulo}`}>
                              <DeleteRounded sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

        </Paper>

        {/* Guías paso a paso — sección independiente con su propio formulario */}
        <Paper sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
            <SectionLabel>Guías paso a paso · {guiasBib.length}</SectionLabel>
            <Button size="small" variant="contained" startIcon={<FormatListNumberedRounded />} onClick={() => openBibModal()}>
              Nueva guía
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', mb: 1.5 }}>
            Instrucciones escritas por pasos que el paciente sigue en Autorregulación.
          </Typography>
          <Box>
            <Stack spacing={1.25}>
              {guiasBib.map((g) => (
                <Box key={g.id} sx={[glassSx, { borderRadius: 3, px: 2.25, py: 1.75 }]}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={{ fontSize: '0.6rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {g.categoria}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{g.titulo}</Typography>
                      <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled', mt: 0.25 }}>
                        {g.duracion} · {g.pasos.length} pasos · {g.creadoPor}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
                      <Tooltip title="Vista previa">
                        <IconButton size="small" onClick={() => setPreviewBib(g)} aria-label={`Ver ${g.titulo}`}>
                          <VisibilityRounded sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar guía">
                        <IconButton size="small" onClick={() => openBibModal(g)} aria-label={`Editar ${g.titulo}`}>
                          <EditRounded sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar guía">
                        <IconButton size="small" onClick={() => void eliminarGuiaBib(g.id)} aria-label={`Eliminar ${g.titulo}`}>
                          <DeleteRounded sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Box>
              ))}
              {guiasBib.length === 0 && (
                <EmptyState
                  icon={FormatListNumberedRounded}
                  title="Sin guías paso a paso"
                  description="Crea una guía escrita que tus pacientes sigan en Autorregulación."
                  actionLabel="Guía paso a paso"
                  onAction={() => openBibModal()}
                />
              )}
            </Stack>
          </Box>
        </Paper>
        </>
      )}

      {tab === 'tips' && (
        <Paper sx={{ p: 2.5 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 1 }}>
            <SectionLabel>Tips para tus pacientes</SectionLabel>
            <Button variant="contained" size="small" startIcon={<AddRounded />} onClick={() => openTipModal()}>
              Nuevo tip
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', mb: 2 }}>
            Rotan en el Inicio del paciente o aparecen al pasar el mouse sobre las métricas.
          </Typography>
          <Stack spacing={1.5}>
            {tips.map((t) => (
              <Stack key={t.id} direction="row" spacing={1.5} sx={[glassSx, { borderRadius: '12px', px: 2.25, py: 1.75, alignItems: 'center' }]}>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{t.texto}</Typography>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: 'text.disabled', mt: 0.5 }}>
                    {t.creadoPor}
                  </Typography>
                </Box>
                <Chip
                  size="small"
                  label={t.contexto === 'inicio' ? 'Inicio' : 'Métricas'}
                  sx={{
                    fontSize: '0.62rem',
                    bgcolor: alpha(t.contexto === 'inicio' ? '#E2B84A' : '#60a5fa', 0.12),
                    color: t.contexto === 'inicio' ? '#E2B84A' : '#60a5fa',
                  }}
                />
                <Tooltip title="Editar tip">
                  <IconButton size="small" onClick={() => openTipModal(t)} aria-label={`Editar tip`}>
                    <EditRounded sx={{ fontSize: 16, color: 'text.secondary' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar tip">
                  <IconButton size="small" onClick={() => void eliminarTip(t.id)} aria-label="Eliminar tip">
                    <DeleteRounded sx={{ fontSize: 16, color: 'rgba(248,113,113,0.7)' }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
            {tips.length === 0 && (
              <EmptyState
                icon={TipsAndUpdatesRounded}
                title="Sin tips publicados"
                description="Escribe frases breves que acompañen a tus pacientes en Inicio y en las métricas."
                actionLabel="Nuevo tip"
                onAction={() => openTipModal()}
              />
            )}
          </Stack>
        </Paper>
      )}

      {/* Nuevo tip */}
      <Dialog open={tipModal} onClose={() => setTipModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>{editingTipId ? 'Editar tip' : 'Nuevo tip'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            <TextField
              label="Texto del tip"
              value={tipForm.texto}
              onChange={(e) => setTipForm((f) => ({ ...f, texto: e.target.value }))}
              multiline
              minRows={2}
              required
              placeholder="Ej: Respirar 4-7-8 tres ciclos baja la activación."
            />
            <Select
              size="small"
              value={tipForm.contexto}
              onChange={(e) => setTipForm((f) => ({ ...f, contexto: e.target.value as TipContexto }))}
            >
              {TIP_CONTEXTOS.map((c) => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}
            </Select>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTipModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarTip} disabled={!tipValid}>
            {editingTipId ? 'Guardar cambios' : 'Publicar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Nueva guía (video o paso a paso) */}
      <Dialog open={guiaModal} onClose={() => setGuiaModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {tipoGuia === 'video'
            ? editingGuiaId ? 'Editar video' : 'Nuevo video de YouTube'
            : editingBibId ? 'Editar guía paso a paso' : 'Nueva guía paso a paso'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 0.5 }}>
            {tipoGuia === 'video' && (
            <>
            <TextField
              label="Enlace de YouTube"
              placeholder="https://www.youtube.com/watch?v=…"
              value={guiaForm.youtubeUrl}
              onChange={(e) => setGuiaField('youtubeUrl', e.target.value)}
              required
              error={guiaForm.youtubeUrl.length > 0 && !videoId}
              helperText={
                guiaForm.youtubeUrl.length > 0 && !videoId
                  ? 'No reconozco el enlace — usa watch?v=, youtu.be o shorts.'
                  : 'El paciente verá este video dentro de la app, sin salir de ella.'
              }
            />
            {videoId && (
              <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', maxWidth: 280 }}>
                <Box component="img" src={youtubeThumb(videoId)} alt="Vista previa" sx={{ width: '100%', display: 'block' }} />
              </Box>
            )}
            </>
            )}
            <TextField
              label="Título de la guía"
              value={guiaForm.titulo}
              onChange={(e) => setGuiaField('titulo', e.target.value)}
              required
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                label="Categoría"
                value={guiaForm.categoria}
                onChange={(e) => setGuiaField('categoria', e.target.value)}
                required
                sx={{ flex: 1 }}
              >
                {CATEGORIAS_GUIA.map((c) => (
                  <MenuItem key={c} value={c}>{c}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Duración"
                placeholder="p. ej. 8 min"
                value={guiaForm.duracion}
                onChange={(e) => setGuiaField('duracion', e.target.value)}
                required
                sx={{ flex: 1 }}
              />
            </Stack>
            <TextField
              label="Descripción breve"
              placeholder="¿Para qué sirve esta guía y cuándo usarla?"
              value={guiaForm.descripcion}
              onChange={(e) => setGuiaField('descripcion', e.target.value)}
              multiline
              minRows={2}
            />
            {tipoGuia === 'pasos' && (
              <TextField
                label="Pasos de la guía"
                placeholder={'Un paso por línea:\nInhala por la nariz contando 4 segundos\nRetén el aire contando 7…'}
                value={guiaForm.pasos}
                onChange={(e) => setGuiaField('pasos', e.target.value)}
                multiline
                minRows={4}
                required
                helperText="Cada línea se convierte en un paso numerado que el paciente sigue en Autorregulación."
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuiaModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardarGuia} disabled={!guiaValid}>
            {editingGuiaId || editingBibId ? 'Guardar cambios' : 'Publicar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Vista previa de la guía en video (mismo reproductor que ve el paciente) */}
      <VideoPlayerDialog guia={previewGuia} onClose={() => setPreviewGuia(null)} />

      {/* Vista previa de la guía paso a paso (como la ve el paciente) */}
      <Dialog open={previewBib != null} onClose={() => setPreviewBib(null)} maxWidth="xs" fullWidth>
        <DialogTitle>{previewBib?.titulo}</DialogTitle>
        <DialogContent>
          {previewBib && (
            <Stack spacing={1.5} sx={{ mt: 0.5 }}>
              <Typography sx={{ fontSize: '0.62rem', color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {previewBib.categoria} · {previewBib.duracion}
              </Typography>
              <Typography variant="body2" color="text.secondary">{previewBib.descripcion}</Typography>
              <Stack spacing={1}>
                {previewBib.pasos.map((paso, i) => (
                  <Stack key={i} direction="row" spacing={1.25} sx={{ alignItems: 'flex-start' }}>
                    <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: 'primary.main', width: 18, flexShrink: 0 }}>
                      {i + 1}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">{paso}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewBib(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Detalle del paciente */}
      <Dialog open={pacienteView != null} onClose={() => setPacienteView(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Detalle del paciente</DialogTitle>
        <DialogContent>
          {pacienteView && (
            <Stack spacing={2} sx={{ mt: 0.5 }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 44, height: 44, fontSize: '1rem' }}>{pacienteView.nombre.slice(0, 1)}</Avatar>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{pacienteView.nombre}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>{pacienteView.empresa}</Typography>
                </Box>
              </Stack>
              <Box>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Estrés actual
                  </Typography>
                  <Typography sx={{ fontFamily: monoFont, fontSize: '0.72rem', color: stressColor(pacienteView.estres) }}>
                    {pacienteView.estres}%
                  </Typography>
                </Stack>
                <StressBar value={pacienteView.estres} showValue={false} height={5} />
              </Box>
              {/* Signos de hoy: mismos datos que ve el paciente en CAREband */}
              <Box>
                <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1 }}>
                  Signos de hoy
                </Typography>
                <Grid container spacing={1}>
                  {(() => {
                    const s = signosDe(String(pacienteView.id))
                    if (!s) return <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>Sin lecturas de CAREband.</Typography>
                    return [
                      ['FC', `${s.frecuenciaCardiaca} bpm`],
                      ['Presión', `${s.presionSistolica}/${s.presionDiastolica}`],
                      ['SpO₂', `${s.oxigenoSangre}%`],
                      ['Sueño', `${s.tipoSueno} · ${s.horasSueno}h`],
                      ['Calorías', `${s.caloriasDia.toLocaleString('es')} kcal`],
                      ['Pasos', s.pasosDia.toLocaleString('es')],
                    ].map(([label, value]) => (
                      <Grid key={label} size={6}>
                        <Box sx={{ px: 1.25, py: 1, borderRadius: 2, background: alpha('#ffffff', 0.04) }}>
                          <Typography sx={{ fontFamily: monoFont, fontSize: '0.78rem' }}>{value}</Typography>
                          <Typography sx={{ fontSize: '0.58rem', color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  })()}
                </Grid>
              </Box>
              {[
                ['Última cita', pacienteView.ultimaCita],
                ['Nota clínica', pacienteView.nota ?? 'Sin notas'],
              ].map(([label, value]) => (
                <Stack key={label} direction="row" spacing={2} sx={{ alignItems: 'baseline' }}>
                  <Typography sx={{ width: 110, flexShrink: 0, fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {label}
                  </Typography>
                  <Typography variant="body2">{value}</Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPacienteView(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default MiPanelPage
