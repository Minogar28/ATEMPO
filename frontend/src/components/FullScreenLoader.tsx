import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { APP_NAME } from '@src/config/api'

// Fallback de <Suspense> mientras cargan las vistas lazy.
const FullScreenLoader = () => (
  <Box
    role="status"
    aria-label="Cargando"
    sx={{
      position: 'fixed',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      bgcolor: 'background.default',
      zIndex: (theme) => theme.zIndex.modal + 1,
    }}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h4"
        sx={{ letterSpacing: '0.28em', fontWeight: 700, mb: 2 }}
      >
        {APP_NAME}
      </Typography>
      <Box
        sx={{
          width: 160,
          height: 2,
          mx: 'auto',
          borderRadius: 1,
          overflow: 'hidden',
          bgcolor: 'divider',
          '&::after': {
            content: '""',
            display: 'block',
            width: '40%',
            height: '100%',
            bgcolor: 'primary.main',
            animation: 'loaderSweep 1.1s ease-in-out infinite',
          },
        }}
      />
    </Box>
  </Box>
)

export default FullScreenLoader
