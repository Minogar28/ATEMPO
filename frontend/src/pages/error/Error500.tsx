import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { AuthBackground, PageMetaData } from '@src/components'
import { riseInSx } from '@src/theme/brand'

const Error500 = () => {
  const navigate = useNavigate()

  return (
    <AuthBackground>
      <PageMetaData title="Error del servidor" />
      <Box sx={[riseInSx, { textAlign: 'center' }]}>
        <Typography
          sx={{
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '6rem', md: '10rem' },
            lineHeight: 1,
            color: 'error.main',
          }}
        >
          500
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
          Algo salió mal
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Ocurrió un error inesperado. Intenta de nuevo en unos minutos.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Volver al inicio
        </Button>
      </Box>
    </AuthBackground>
  )
}

export default Error500
