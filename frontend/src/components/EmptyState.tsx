import { Box, Button, Stack, Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router'

interface EmptyStateProps {
  icon?: SvgIconComponent
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  onAction?: () => void
}

// Estado vacío consistente: icono en chip de vidrio, mensaje y una acción
// sugerida — el primer paso nunca queda vacío.
const EmptyState = ({ icon: Icon, title, description, actionLabel, actionTo, onAction }: EmptyStateProps) => (
  <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', py: 4, px: 2 }}>
    {Icon && (
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 3,
          display: 'grid',
          placeItems: 'center',
          background: 'rgba(226,184,74,0.1)',
          border: '1px solid rgba(226,184,74,0.25)',
        }}
      >
        <Icon sx={{ fontSize: 20, color: 'primary.main' }} />
      </Box>
    )}
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600 }}>{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem', mt: 0.25 }}>
          {description}
        </Typography>
      )}
    </Box>
    {actionLabel && (actionTo || onAction) && (
      <Button
        size="small"
        variant="outlined"
        {...(actionTo ? { component: RouterLink, to: actionTo } : { onClick: onAction })}
      >
        {actionLabel}
      </Button>
    )}
  </Stack>
)

export default EmptyState
