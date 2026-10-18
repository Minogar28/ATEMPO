import { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { MoreHorizRounded, PowerSettingsNewRounded } from '@mui/icons-material'
import { alpha } from '@mui/material/styles'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router'
import type { MenuItem } from '@src/helpers/menu'
import { brandTokens, glassBottombarSx, navActiveSx } from '@src/theme/brand'
import { useAuth } from '@src/states/AuthContext'
import { useAppMenu } from './LeftSideBar/useAppMenu'

// Barra inferior flotante del prototipo: 5 primarios + "Más" que despliega
// el resto en un panel glass sobre la barra.
const NavButton = ({ item, active }: { item: MenuItem; active: boolean }) => (
  <Box
    component={RouterLink}
    to={item.path ?? '#'}
    sx={[
      {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.25,
        px: 1.25,
        py: 0.75,
        borderRadius: '16px',
        textDecoration: 'none',
        transition: 'all 0.2s',
        color: active ? brandTokens.mustard : alpha('#FAF6ED', 0.4),
      },
      active ? navActiveSx : { '&:hover': { background: 'rgba(255,255,255,0.04)' } },
    ]}
  >
    {active && (
      <Box sx={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', bgcolor: brandTokens.mustard }} />
    )}
    {item.icon && <item.icon sx={{ fontSize: 17, mt: 0.5 }} />}
    <Typography sx={{ fontSize: '0.5625rem', fontWeight: 500, color: active ? brandTokens.mustard : alpha('#FAF6ED', 0.3) }}>
      {item.label}
    </Typography>
  </Box>
)

const MobileNav = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [showMore, setShowMore] = useState(false)
  const sections = useAppMenu()
  const items = useMemo(() => sections.flatMap((s) => s.items), [sections])
  const primary = items.slice(0, 5)
  const rest = items.slice(5)
  const isMoreActive = rest.some((m) => m.path === pathname)

  const handleLogout = async () => {
    setShowMore(false)
    await logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        zIndex: 1200,
      }}
    >
      {showMore && (
        <Box sx={{ position: 'absolute', bottom: '100%', mb: 1, left: 0, right: 0 }}>
          <Box sx={[glassBottombarSx, { borderRadius: '24px', p: 1.5 }]}>
            {rest.length > 0 && (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
            {rest.map((item) => {
              const active = pathname === item.path
              return (
                <Box
                  key={item.key}
                  component={RouterLink}
                  to={item.path ?? '#'}
                  onClick={() => setShowMore(false)}
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5,
                      py: 1.25,
                      borderRadius: '16px',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      color: active ? brandTokens.mustard : alpha('#FAF6ED', 0.45),
                    },
                    active ? navActiveSx : { '&:hover': { background: 'rgba(255,255,255,0.05)' } },
                  ]}
                >
                  {item.icon && <item.icon sx={{ fontSize: 18 }} />}
                  <Typography sx={{ fontSize: '0.5625rem', fontWeight: 500, color: active ? brandTokens.mustard : alpha('#FAF6ED', 0.35) }}>
                    {item.label}
                  </Typography>
                </Box>
              )
            })}
              </Box>
            )}
            {/* Cerrar sesión — en móvil no hay sidebar con el botón */}
            <Box
              component="button"
              onClick={handleLogout}
              sx={{
                mt: rest.length > 0 ? 1 : 0,
                pt: rest.length > 0 ? 1.25 : 0,
                borderTop: rest.length > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.75,
                py: 1,
                border: 0,
                borderRadius: '14px',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                color: alpha('#f87171', 0.85),
                transition: 'background 0.2s',
                '&:hover': { background: alpha('#f87171', 0.08) },
              }}
            >
              <PowerSettingsNewRounded sx={{ fontSize: 17 }} />
              <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: 'inherit' }}>
                Cerrar sesión
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      <Box component="nav" sx={[glassBottombarSx, { borderRadius: '24px', px: 1, py: 0.75, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }]}>
        {primary.map((item) => (
          <Box key={item.key} onClick={() => setShowMore(false)} sx={{ display: 'contents' }}>
            <NavButton item={item} active={pathname === item.path} />
          </Box>
        ))}

        {/* "Más" siempre visible: cuando no hay módulos extra aloja el logout */}
        <Box
          component="button"
          onClick={() => setShowMore((v) => !v)}
            sx={[
              {
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.25,
                px: 1.25,
                py: 0.75,
                border: 0,
                borderRadius: '16px',
                background: 'transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                color: showMore || isMoreActive ? brandTokens.mustard : alpha('#FAF6ED', 0.4),
              },
              showMore || isMoreActive ? navActiveSx : { '&:hover': { background: 'rgba(255,255,255,0.04)' } },
            ]}
          >
            {(showMore || isMoreActive) && (
              <Box sx={{ position: 'absolute', top: 6, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', bgcolor: brandTokens.mustard }} />
            )}
            <MoreHorizRounded sx={{ fontSize: 17, mt: 0.5 }} />
            <Typography sx={{ fontSize: '0.5625rem', fontWeight: 500, color: showMore || isMoreActive ? brandTokens.mustard : alpha('#FAF6ED', 0.3) }}>
              Más
            </Typography>
          </Box>
      </Box>
    </Box>
  )
}

export default MobileNav
