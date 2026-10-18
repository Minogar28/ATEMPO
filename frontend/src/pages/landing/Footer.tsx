import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { glassMustardSx } from '@src/theme/brand'
import { displayFont, monoFont } from '@src/theme/typography'
import { ContainerBox } from './components'

const Footer = () => (
  <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.07)', py: 4, mt: 4 }}>
    <ContainerBox>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Box
            sx={[
              glassMustardSx,
              { width: 30, height: 30, borderRadius: '9px', display: 'grid', placeItems: 'center' },
            ]}
          >
            <Box component="span" sx={{ fontFamily: displayFont, fontSize: '0.95rem', color: 'primary.main' }}>
              A
            </Box>
          </Box>
          <Box component="span" sx={{ fontFamily: displayFont, fontSize: '1rem' }}>
            ATEMPO
          </Box>
        </Box>
        <Typography
          sx={{ fontFamily: monoFont, fontSize: '0.62rem', color: alpha('#FAF6ED', 0.35), textAlign: 'center', letterSpacing: '0.06em' }}
        >
          {new Date().getFullYear()} · Bienestar psicofisiológico · Datos protegidos — Ley 1581 de 2012
        </Typography>
      </Box>
    </ContainerBox>
  </Box>
)

export default Footer
