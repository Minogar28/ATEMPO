import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router'
import { Box, Button, Link } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { BadgeRounded, GroupsRounded, ShieldRounded, SpaRounded, WidgetsRounded } from '@mui/icons-material'
import { AppLogo } from '@src/components'
import { displayFont } from '@src/theme/typography'
import { ContainerBox } from './components'

const NAV_LINKS = [
  { href: '#modulos', label: 'Plataforma', icon: WidgetsRounded },
  { href: '#experiencia', label: 'Experiencia', icon: SpaRounded },
  { href: '#roles', label: 'Roles', icon: BadgeRounded },
  { href: '#equipo', label: 'Equipo', icon: GroupsRounded },
  { href: '#privacidad', label: 'Privacidad', icon: ShieldRounded },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        background: scrolled ? alpha('#0C1F3C', 0.72) : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}
    >
      <ContainerBox>
        <Box sx={{ display: 'flex', height: '4.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <AppLogo size={38} />
            <Box component="span" sx={{ fontFamily: displayFont, fontSize: '1.15rem' }}>
              ATEMPO
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                underline="none"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.625,
                  px: 1.25,
                  py: 0.5,
                  fontSize: '0.78rem',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  transition: 'color 0.2s',
                }}
              >
                <Icon sx={{ fontSize: 15, color: 'primary.main' }} />
                {label}
              </Link>
            ))}
          </Box>

          <Button
            component={RouterLink}
            to="/auth/login"
            variant="contained"
            size="small"
          >
            Iniciar sesión
          </Button>
        </Box>
      </ContainerBox>
    </Box>
  )
}

export default Navbar
