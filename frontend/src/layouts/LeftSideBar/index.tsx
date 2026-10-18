import { useSyncExternalStore } from 'react'
import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import {
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
  PowerSettingsNewRounded,
} from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { useNavigate } from 'react-router'
import { useAuth } from '@src/states/AuthContext'
import { useLayout } from '@src/states/LayoutContext'
import { getFotoPerfil, subscribePerfil } from '@src/services/perfil.service'
import { brandTokens, glassSidebarSx, glassSx } from '@src/theme/brand'
import { stressColor } from '@src/theme/status'
import { monoFont } from '@src/theme/typography'
import AppMenu from './AppMenu'
import LogoBox from './LogoBox'
import { useAppMenu } from './useAppMenu'

const { sidenavWidth, sidenavCollapsedWidth } = brandTokens
const divider = { borderBottom: '1px solid rgba(255,255,255,0.06)' }

const SidebarContent = ({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const sections = useAppMenu()
  // Foto reactiva: se relee del store cuando cambia (evento atempo:perfil).
  const foto = useSyncExternalStore(
    subscribePerfil,
    () => (user ? getFotoPerfil(user.id) : null),
  ) ?? undefined

  const handleLogout = async () => {
    await logout()
    navigate('/auth/login', { replace: true })
  }

  const collapseButton = (
    <Tooltip title={collapsed ? 'Expandir menú' : 'Contraer menú'} placement="right">
      <IconButton
        onClick={onToggle}
        size="small"
        aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}
        sx={{ color: alpha('#FAF6ED', 0.35), '&:hover': { color: alpha('#FAF6ED', 0.75) } }}
      >
        {collapsed ? <KeyboardDoubleArrowRightRounded fontSize="small" /> : <KeyboardDoubleArrowLeftRounded fontSize="small" />}
      </IconButton>
    </Tooltip>
  )

  return (
    <Box
      component="aside"
      sx={[
        glassSidebarSx,
        { height: '100%', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
      ]}
    >
      {/* Logo + botón de colapso */}
      <Box
        sx={[
          divider,
          collapsed
            ? { px: 1, pt: 2, pb: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }
            : { px: 2.5, pt: 2.5, pb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
        ]}
      >
        <LogoBox collapsed={collapsed} />
        {collapseButton}
      </Box>

      {/* Usuario */}
      {user && (
        <Box sx={[divider, collapsed ? { px: 1, py: 1.5, display: 'flex', justifyContent: 'center' } : { px: 1.5, py: 1.25 }]}>
          {collapsed ? (
            <Tooltip title={user.name} placement="right">
              <Avatar src={foto} sx={{ width: 30, height: 30, fontSize: '0.75rem', borderRadius: '12px' }}>
                {user.name.slice(0, 1)}
              </Avatar>
            </Tooltip>
          ) : (
            <Tooltip
              title={`Nivel ${Math.floor((user.xp ?? 0) / 500) + 1} · ${(user.xp ?? 0).toLocaleString()} XP`}
              placement="right"
              arrow
            >
              <Box sx={[glassSx, { borderRadius: '16px', px: 1.5, py: 1, display: 'flex', alignItems: 'center', gap: 1.25 }]}>
                <Avatar src={foto} sx={{ width: 28, height: 28, fontSize: '0.72rem', borderRadius: '10px', flexShrink: 0 }}>
                  {user.name.slice(0, 1)}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }} noWrap>
                    {user.name}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          )}
        </Box>
      )}

      {/* Navegación */}
      <Box component="nav" className="scroll-area" sx={{ flex: 1, px: collapsed ? 1 : 1.25, py: 1.5 }}>
        <AppMenu sections={sections} collapsed={collapsed} />
      </Box>

      {/* Estrés */}
      {user?.stressLevel != null && (
        <Box sx={{ px: collapsed ? 1.5 : 1.5, pb: 1 }}>
          {collapsed ? (
            <Tooltip title={`Estrés ${user.stressLevel}%`} placement="right">
              <Box sx={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.07)' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: `${user.stressLevel}%`,
                    borderRadius: 999,
                    background: stressColor(user.stressLevel),
                    transition: 'width 0.7s',
                  }}
                />
              </Box>
            </Tooltip>
          ) : (
            <Box sx={[glassSx, { borderRadius: '16px', px: 1.5, py: 1.25 }]}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography sx={{ fontSize: '0.5625rem', color: alpha('#FAF6ED', 0.3), letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Estrés
                </Typography>
                <Typography sx={{ fontFamily: monoFont, fontSize: '0.625rem', fontWeight: 500, color: stressColor(user.stressLevel) }}>
                  {user.stressLevel}%
                </Typography>
              </Box>
              <Box sx={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
                <Box
                  sx={{
                    height: '100%',
                    width: `${user.stressLevel}%`,
                    borderRadius: 999,
                    background: stressColor(user.stressLevel),
                    transition: 'width 0.7s',
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Logout */}
      <Box sx={{ px: collapsed ? 1 : 1.25, pb: 2 }}>
        {collapsed ? (
          <Tooltip title="Cerrar sesión" placement="right">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={handleLogout} size="small" sx={{ color: alpha('#FAF6ED', 0.3), '&:hover': { color: alpha('#FAF6ED', 0.6) } }}>
                <PowerSettingsNewRounded fontSize="small" />
              </IconButton>
            </Box>
          </Tooltip>
        ) : (
          <Box
            component="button"
            onClick={handleLogout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              width: '100%',
              px: 1.5,
              py: 1,
              border: 0,
              borderRadius: '16px',
              background: 'transparent',
              cursor: 'pointer',
              color: alpha('#FAF6ED', 0.25),
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              transition: 'all 0.2s',
              '&:hover': { background: 'rgba(255,255,255,0.04)', color: alpha('#FAF6ED', 0.55) },
            }}
          >
            <PowerSettingsNewRounded sx={{ fontSize: 16 }} />
            Cerrar sesión
          </Box>
        )}
      </Box>
    </Box>
  )
}

// Sidebar flotante solo en desktop; en móvil la navegación es MobileNav.
const LeftSideBar = () => {
  const { settings, toggleSidenav } = useLayout()
  const collapsed = settings.sidenavCollapsed

  return (
    <Box
      sx={{
        height: '100%',
        py: 2,
        pl: 2,
        flexShrink: 0,
        width: (collapsed ? sidenavCollapsedWidth : sidenavWidth) + 16,
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <SidebarContent collapsed={collapsed} onToggle={toggleSidenav} />
    </Box>
  )
}

export default LeftSideBar
