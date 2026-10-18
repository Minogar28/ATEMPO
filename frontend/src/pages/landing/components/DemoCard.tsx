import { Box, Paper, Typography } from '@mui/material'
import type { SvgIconComponent } from '@mui/icons-material'
import { glassSx } from '@src/theme/brand'

// Tarjeta de presentación de un módulo o pilar de la plataforma.
const DemoCard = ({ icon: Icon, name, description }: { icon: SvgIconComponent; name: string; description: string }) => (
  <Paper
    sx={{
      p: 2.5,
      height: '100%',
      transition: 'transform 0.25s, border-color 0.25s',
      '&:hover': { transform: 'translateY(-4px)', borderColor: 'rgba(226,184,74,0.35)' },
    }}
  >
    <Box
      sx={[
        glassSx,
        {
          width: 42,
          height: 42,
          borderRadius: 2.5,
          display: 'grid',
          placeItems: 'center',
          mb: 1.75,
          border: '1px solid rgba(226,184,74,0.25)',
        },
      ]}
    >
      <Icon sx={{ fontSize: 20, color: 'primary.main' }} />
    </Box>
    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.5 }}>{name}</Typography>
    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.6 }}>
      {description}
    </Typography>
  </Paper>
)

export default DemoCard
