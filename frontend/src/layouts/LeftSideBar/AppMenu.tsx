import { Fragment } from 'react'
import { Box, Divider, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { Link as RouterLink, useLocation } from 'react-router'
import type { MenuItem, MenuSection } from '@src/helpers/menu'
import { brandTokens, navActiveSx } from '@src/theme/brand'

interface AppMenuProps {
  sections: MenuSection[]
  collapsed?: boolean
}

const MenuLink = ({ item, collapsed }: { item: MenuItem; collapsed: boolean }) => {
  const { pathname } = useLocation()
  const isActive = item.path ? pathname === item.path : false

  const link = (
    <Box
      component={RouterLink}
      to={item.path ?? '#'}
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: collapsed ? 0 : 1.5,
          py: 1,
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: '16px',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          color: isActive ? brandTokens.mustard : alpha('#FAF6ED', 0.45),
          '&:hover': {
            color: isActive ? brandTokens.mustard : alpha('#FAF6ED', 0.75),
            background: isActive ? undefined : 'rgba(255,255,255,0.04)',
          },
        },
        isActive ? navActiveSx : {},
      ]}
    >
      {item.icon && <item.icon sx={{ fontSize: 17, flexShrink: 0 }} />}
      {!collapsed && (
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 500 }}>{item.label}</Typography>
      )}
      {!collapsed && isActive && (
        <Box sx={{ ml: 'auto', width: 6, height: 6, borderRadius: '50%', bgcolor: brandTokens.mustard, flexShrink: 0 }} />
      )}
    </Box>
  )

  return collapsed ? (
    <Tooltip title={item.label} placement="right">
      {link}
    </Tooltip>
  ) : (
    link
  )
}

const AppMenu = ({ sections, collapsed = false }: AppMenuProps) => (
  <Box sx={{ display: 'grid', gap: collapsed ? 2 : 1.5 }}>
    {sections.map((section, i) => (
      <Fragment key={section.label}>
        {collapsed ? (
          i > 0 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mx: 0.5 }} />
        ) : (
          <Typography
            sx={{
              fontSize: '0.5625rem',
              color: alpha('#FAF6ED', 0.2),
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              px: 1.5,
              mb: 0.5,
            }}
          >
            {section.label}
          </Typography>
        )}
        <Box sx={{ display: 'grid', gap: 0.25 }}>
          {section.items.map((item) => (
            <MenuLink key={item.key} item={item} collapsed={collapsed} />
          ))}
        </Box>
      </Fragment>
    ))}
  </Box>
)

export default AppMenu
