import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router'
import { AuthBackground, PageMetaData } from '@src/components'
import { riseInSx } from '@src/theme/brand'

const Error404 = () => {
  const navigate = useNavigate()

  return (
    <AuthBackground>
      <PageMetaData title="Página no encontrada" />
      <Box sx={[riseInSx, { textAlign: 'center' }]}>
        <Typography
          sx={{
            fontFamily: '"Bricolage Grotesque", sans-serif',
            fontWeight: 700,
            fontSize: { xs: '6rem', md: '10rem' },
            lineHeight: 1,
            color: 'primary.main',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
          Fuera de tempo
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          La página que buscas no existe o fue movida.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Volver al inicio
        </Button>
      </Box>
    </AuthBackground>
  )
}

export default Error404
