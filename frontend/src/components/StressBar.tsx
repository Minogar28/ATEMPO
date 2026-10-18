import { Box, Stack, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { stressColor } from '@src/theme/status'
import { monoFont } from '@src/theme/typography'

interface StressBarProps {
  value: number
  label?: string
  showValue?: boolean
  height?: number
}

// Barra fina de nivel de estrés con color semafórico.
const StressBar = ({ value, label, showValue = true, height = 4 }: StressBarProps) => (
  <Box sx={{ width: '100%' }}>
    {(label || showValue) && (
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
        {label && (
          <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary' }}>{label}</Typography>
        )}
        {showValue && (
          <Typography sx={{ fontFamily: monoFont, fontSize: '0.68rem', color: stressColor(value) }}>
            {Math.round(value)}
          </Typography>
        )}
      </Stack>
    )}
    <Box sx={{ height, borderRadius: 999, background: alpha('#ffffff', 0.08), overflow: 'hidden' }}>
      <Box
        sx={{
          height: '100%',
          width: `${Math.min(100, Math.max(0, value))}%`,
          borderRadius: 999,
          background: stressColor(value),
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </Box>
  </Box>
)

export default StressBar
