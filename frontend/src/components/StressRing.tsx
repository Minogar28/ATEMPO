import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { stressColor } from '@src/theme/status'
import { monoFont } from '@src/theme/typography'

interface StressRingProps {
  level: number
  size?: number
  stroke?: number
  label?: string
}

// Anillo de nivel de estrés con color semafórico.
const StressRing = ({ level, size = 150, stroke = 10, label = 'Estrés' }: StressRingProps) => {
  const color = stressColor(level)
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - level / 100)

  return (
    <Box sx={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={alpha('#ffffff', 0.08)}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 8px ${alpha(color, 0.5)})` }}
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontFamily: monoFont, fontSize: size * 0.24, fontWeight: 500, lineHeight: 1, color }}>
          {Math.round(level)}
        </Typography>
        <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', letterSpacing: '0.12em', textTransform: 'uppercase', mt: 0.5 }}>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}

export default StressRing
