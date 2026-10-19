import { Box, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { monoFont } from '@src/theme/typography'

// KPI tile: número en DM Mono, label uppercase y hint opcional. El mismo
// patrón se usaba a mano en Home y Mi Panel — ahora es un solo componente.
// `tooltip` explica la métrica al pasar el mouse.
const StatCard = ({ value, label, hint, tooltip }: { value: string | number; label: string; hint?: string; tooltip?: string }) => {
  const card = (
    <Box
      sx={{
        px: 2,
        py: 2,
        borderRadius: 2,
        height: '100%',
        background: alpha('#ffffff', 0.04),
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Typography sx={{ fontFamily: monoFont, fontSize: '1.4rem', fontWeight: 500 }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </Typography>
      {hint && (
        <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled' }}>{hint}</Typography>
      )}
    </Box>
  )
  return tooltip ? (
    <Tooltip title={tooltip} arrow placement="top">
      {card}
    </Tooltip>
  ) : (
    card
  )
}

export default StatCard
