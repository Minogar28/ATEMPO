import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { APP_NAME } from '@src/config/api'
import { glassSx, riseInSx } from '@src/theme/brand'
import type { ReactNode } from 'react'

// Layout público simple: fondo aurora + tarjeta centrada.
const AuthLayout = ({ children }: { children: ReactNode }) => (
  <Container maxWidth="xs">
    <Paper
      elevation={4}
      sx={[glassSx, riseInSx, { p: { xs: 3, sm: 4.5 }, borderRadius: 4 }]}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ letterSpacing: '0.28em', fontWeight: 700 }}
        >
          {APP_NAME}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Tu operación, a tiempo.
        </Typography>
      </Box>
      {children}
    </Paper>
  </Container>
)

export default AuthLayout
