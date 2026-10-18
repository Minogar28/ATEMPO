import { Box } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { brandTokens, glassSx } from '@src/theme/brand'

export interface SegmentedTab {
  id: string
  label: string
}

interface SegmentedTabsProps {
  tabs: SegmentedTab[]
  value: string
  onChange: (id: string) => void
}

// Control segmentado tipo píldora (tabs de perfil, gestión, empresa, login).
const SegmentedTabs = ({ tabs, value, onChange }: SegmentedTabsProps) => (
  <Box
    sx={[
      glassSx,
      {
        display: 'flex',
        gap: 0.5,
        p: 0.5,
        borderRadius: 999,
        width: 'fit-content',
        maxWidth: '100%',
        overflowX: 'auto',
      },
    ]}
  >
    {tabs.map((tab) => {
      const active = tab.id === value
      return (
        <Box
          key={tab.id}
          component="button"
          onClick={() => onChange(tab.id)}
          sx={{
            border: 0,
            cursor: 'pointer',
            borderRadius: 999,
            px: 2,
            py: 0.75,
            fontSize: '0.78rem',
            fontWeight: 500,
            fontFamily: '"Outfit", system-ui, sans-serif',
            whiteSpace: 'nowrap',
            transition: 'all 0.25s',
            ...(active
              ? {
                  background: `linear-gradient(135deg, ${brandTokens.mustard}, ${brandTokens.mustardDark})`,
                  color: brandTokens.navy,
                  boxShadow: `0 2px 12px ${alpha(brandTokens.mustard, 0.35)}`,
                }
              : {
                  background: 'transparent',
                  color: alpha('#FAF6ED', 0.55),
                  '&:hover': { color: '#FAF6ED', background: alpha('#ffffff', 0.06) },
                }),
          }}
        >
          {tab.label}
        </Box>
      )
    })}
  </Box>
)

export default SegmentedTabs
