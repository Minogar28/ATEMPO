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
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { AddRounded, DeleteRounded, EditRounded, SearchRounded, VisibilityRounded } from '@mui/icons-material'
import { PageMetaData, SectionLabel, SegmentedTabs } from '@src/components'
import { glassSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { useGestion } from './hooks/useGestion'
import type { GestionTab } from './types'

const TAB_LABELS: Record<GestionTab, string> = {
  empresas: 'empresa',
  psicologos: 'psicólogo',
  pacientes: 'paciente',
}

const GestionPage = () => {
  const {
    tab, setTab, search, setSearch, rows,
    modalOpen, setModalOpen, openCreate, openEdit, openView,
    fields, form, setField, formValid, guardar, editingId, viewing, setViewing, eliminar,
  } = useGestion()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Gestión" />

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ fontFamily: displayFont, fontSize: '1.7rem' }}>Gestión</Typography>
          <Typography variant="body2" color="text.secondary">
            Empresas, psicólogos y pacientes de la plataforma.
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRounded />} onClick={openCreate} sx={{ alignSelf: { sm: 'center' } }}>
          Nueva {TAB_LABELS[tab]}
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ justifyContent: 'space-between' }}>
        <SegmentedTabs
          tabs={[
            { id: 'empresas', label: 'Empresas' },
            { id: 'psicologos', label: 'Psicólogos' },
            { id: 'pacientes', label: 'Pacientes' },
          ]}
          value={tab}
          onChange={(id) => { setTab(id as GestionTab); setSearch('') }}
        />
        <TextField
          size="small"
          placeholder="Buscar…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{ input: { startAdornment: <SearchRounded sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} /> } }}
          sx={{ width: { md: 260 } }}
        />
      </Stack>

      <Paper sx={{ p: 2.5 }}>
        <SectionLabel>{tab.charAt(0).toUpperCase() + tab.slice(1)} · {rows.length}</SectionLabel>
        <Stack spacing={1.5}>
          {rows.map((row) => (
            <Box key={row.id} sx={[glassSx, { borderRadius: 4, p: 1.75 }]}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 36, height: 36, fontSize: '0.8rem' }}>{row.nombre.slice(0, 1)}</Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.nombre}</Typography>
                  <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }} noWrap>{row.detalle}</Typography>
                </Box>
                {row.extra && (
                  <Chip
                    size="small"
                    label={row.extra}
                    sx={{ bgcolor: alpha('#ffffff', 0.06), fontSize: '0.62rem', height: 22 }}
                  />
                )}
                <Tooltip title="Ver detalle">
                  <IconButton size="small" onClick={() => openView(row)} aria-label={`Ver ${row.nombre}`}>
                    <VisibilityRounded sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton size="small" onClick={() => openEdit(row)} aria-label={`Editar ${row.nombre}`}>
                    <EditRounded sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton size="small" onClick={() => void eliminar(row)} aria-label={`Eliminar ${row.nombre}`}>
                    <DeleteRounded sx={{ fontSize: 16, color: 'rgba(248,113,113,0.7)' }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          ))}
          {rows.length === 0 && (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 3 }}>
              Sin resultados para «{search}».
            </Typography>
          )}
        </Stack>
      </Paper>

      {/* Crear / editar */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingId != null ? 'Editar' : 'Nueva'} {TAB_LABELS[tab]}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            {fields.map((f) => (
              <Grid key={f.name} size={{ xs: 12, sm: f.half ? 6 : 12 }}>
                <TextField
                  label={f.label}
                  type={f.type === 'select' ? undefined : f.type}
                  select={f.type === 'select'}
                  required={f.required}
                  value={form[f.name] ?? ''}
                  onChange={(e) => setField(f.name, e.target.value)}
                  fullWidth
                  slotProps={f.type === 'date' ? { inputLabel: { shrink: true } } : undefined}
                >
                  {f.type === 'select' &&
                    f.options?.map((opt) => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={guardar} disabled={!formValid}>
            {editingId != null ? 'Guardar cambios' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Detalle */}
      <Dialog open={viewing != null} onClose={() => setViewing(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Detalle — {TAB_LABELS[tab]}</DialogTitle>
        <DialogContent>
          {viewing && (
            <Stack spacing={0} sx={{ mt: 0.5 }}>
              {fields.map((f) => (
                <Stack
                  key={f.name}
                  direction="row"
                  spacing={2}
                  sx={{ py: 1.25, borderBottom: '1px solid rgba(255,255,255,0.05)', alignItems: 'baseline' }}
                >
                  <Typography sx={{ width: 170, flexShrink: 0, fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {f.label}
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: f.type === 'number' ? monoFont : undefined }}>
                    {viewing.values[f.name] || '—'}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewing(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default GestionPage
