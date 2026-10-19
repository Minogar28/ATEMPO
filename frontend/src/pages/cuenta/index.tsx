import { Avatar, Badge, Box, Divider, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { AddPhotoAlternateRounded, BusinessRounded } from '@mui/icons-material'
import { PageHeader, PageMetaData, SectionLabel, SegmentedTabs } from '@src/components'
import { glassSx, riseInSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { useCuenta } from './hooks/useCuenta'
import type { FichaItem } from './types'

const Ficha = ({ items }: { items: FichaItem[] }) => (
  <Paper sx={{ p: 2.5 }}>
    <Stack divider={<Divider flexItem sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />}>
      {items.map((item) => (
        <Stack key={item.label} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{item.label}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.valor}</Typography>
        </Stack>
      ))}
    </Stack>
  </Paper>
)

const CuentaPage = () => {
  const {
    user, tab, setTab, tabs, personal, fisiologica, consentimientos, toggleConsent,
    foto, subirFoto, fotoInputRef,
    esEmpresa, logoEmpresa, subirLogo, logoInputRef,
  } = useCuenta()

  return (
    <Stack spacing={3} sx={riseInSx}>
      <PageMetaData title="Perfil" />

      <PageHeader title="Mi cuenta" subtitle="Tu información, datos fisiológicos y privacidad." />

      <Paper sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                size="small"
                onClick={() => fotoInputRef.current?.click()}
                sx={{
                  width: 26, height: 26,
                  bgcolor: 'primary.main', color: '#0C1F3C',
                  border: '2px solid rgba(12,31,60,0.9)',
                  '&:hover': { bgcolor: 'primary.light' },
                }}
              >
                <AddPhotoAlternateRounded sx={{ fontSize: 14 }} />
              </IconButton>
            }
          >
            <Avatar src={foto ?? undefined} sx={{ width: 56, height: 56, fontSize: '1.3rem' }}>
              {user?.name.slice(0, 1)}
            </Avatar>
          </Badge>
          <input
            ref={fotoInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => { subirFoto(e.target.files?.[0]); e.target.value = '' }}
          />
          <Box>
            <Typography sx={{ fontFamily: displayFont, fontSize: '1.2rem' }}>{user?.name}</Typography>
            <Typography sx={{ fontFamily: monoFont, fontSize: '0.68rem', color: 'text.secondary' }}>
              {user?.email} · {user?.roles.join(', ')}
            </Typography>
            <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled', mt: 0.5 }}>
              Toca el ícono para cambiar tu foto
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {esEmpresa && (
        <Paper sx={{ p: 2.5 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <IconButton
                  size="small"
                  onClick={() => logoInputRef.current?.click()}
                  sx={{
                    width: 26, height: 26,
                    bgcolor: 'primary.main', color: '#0C1F3C',
                    border: '2px solid rgba(12,31,60,0.9)',
                    '&:hover': { bgcolor: 'primary.light' },
                  }}
                >
                  <AddPhotoAlternateRounded sx={{ fontSize: 14 }} />
                </IconButton>
              }
            >
              <Avatar
                src={logoEmpresa ?? undefined}
                variant="rounded"
                sx={{ width: 56, height: 56, fontSize: '1.3rem', ...glassSx }}
              >
                <BusinessRounded />
              </Avatar>
            </Badge>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => { subirLogo(e.target.files?.[0]); e.target.value = '' }}
            />
            <Box>
              <Typography sx={{ fontFamily: displayFont, fontSize: '1.1rem' }}>
                {user?.empresa ?? 'Logo de la empresa'}
              </Typography>
              <Typography sx={{ fontFamily: monoFont, fontSize: '0.68rem', color: 'text.secondary' }}>
                Identidad visual corporativa
              </Typography>
              <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled', mt: 0.5 }}>
                Este logo aparece en el panel de empresa
              </Typography>
            </Box>
          </Stack>
        </Paper>
      )}

      <SegmentedTabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === 'personal' && <Ficha items={personal} />}
      {tab === 'fisiologica' && <Ficha items={fisiologica} />}

      {tab === 'privacidad' && (
        <Paper sx={{ p: 2.5 }}>
          <SectionLabel>Consentimientos</SectionLabel>
          <Stack spacing={1.5}>
            {consentimientos.map((c) => (
              <Box key={c.id} sx={[glassSx, { borderRadius: 4, p: 1.75 }]}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{c.label}</Typography>
                    <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>
                      {c.descripcion}
                    </Typography>
                  </Box>
                  <Switch
                    checked={c.activo}
                    onChange={() => toggleConsent(c.id)}
                    sx={{
                      '& .MuiSwitch-track': { bgcolor: alpha('#ffffff', 0.12) },
                    }}
                  />
                </Stack>
              </Box>
            ))}
          </Stack>
          <Typography sx={{ fontSize: '0.65rem', color: 'text.disabled', mt: 2 }}>
            Puedes revocar cualquier consentimiento en cualquier momento. La revocación no afecta tratamientos previos.
          </Typography>
        </Paper>
      )}
    </Stack>
  )
}

export default CuentaPage
