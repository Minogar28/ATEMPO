import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { monoFont } from '@src/theme/typography'

interface GaugeProps {
  value: number
  min?: number
  max?: number
  unit?: string
  label?: string
  color?: string
  size?: number
}

// Gauge semicircular para signos vitales (HR, SpO2, temperatura).
const Gauge = ({ value, min = 0, max = 100, unit = '', label, color = '#E2B84A', size = 130 }: GaugeProps) => {
  const ratio = Math.min(1, Math.max(0, (value - min) / (max - min)))
  const w = size
  const h = size * 0.62
  const r = w * 0.42
  const cx = w / 2
  const cy = h - 8
  const angle = Math.PI * (1 - ratio)
  const arcX = cx + r * Math.cos(angle)
  const arcY = cy - r * Math.sin(angle)

  return (
    <Box sx={{ width: w }}>
      <svg width={w} height={h}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={alpha('#ffffff', 0.08)}
          strokeWidth={9}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${arcX} ${arcY}`}
          fill="none"
          stroke={color}
          strokeWidth={9}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${alpha(color, 0.5)})` }}
        />
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          fill="#FAF6ED"
          fontFamily={monoFont}
          fontSize={size * 0.2}
          fontWeight={500}
        >
          {Math.round(value)}
        </text>
        {unit && (
          <text x={cx} y={cy + 2} textAnchor="middle" fill={alpha('#FAF6ED', 0.5)} fontSize={9}>
            {unit}
          </text>
        )}
      </svg>
      {label && (
        <Typography
          align="center"
          sx={{ fontSize: '0.62rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.12em', mt: -0.5 }}
        >
          {label}
        </Typography>
      )}
    </Box>
  )
}

export default Gauge
