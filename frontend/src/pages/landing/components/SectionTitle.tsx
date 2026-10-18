import { Box, Typography } from '@mui/material'
import { SectionLabel } from '@src/components'
import { displayFont } from '@src/theme/typography'

const SectionTitle = ({ name, title, description }: { name: string; title: string; description?: string }) => (
  <Box sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto', mb: 4 }}>
    <SectionLabel>{name}</SectionLabel>
    <Typography sx={{ fontFamily: displayFont, fontSize: { xs: '1.6rem', sm: '2rem' }, mb: 1 }}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
        {description}
      </Typography>
    )}
  </Box>
)

export default SectionTitle
