import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import GitHub from '@mui/icons-material/GitHub'
import Instagram from '@mui/icons-material/Instagram'
import XIcon from '@mui/icons-material/X'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com/Minogar28/ATEMPO', Icon: GitHub },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'X', href: '#', Icon: XIcon },
]

const SocialLinks = () => (
  <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
    {LINKS.map(({ label, href, Icon }) => (
      <IconButton
        key={label}
        size="small"
        component="a"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
      >
        <Icon fontSize="small" />
      </IconButton>
    ))}
  </Stack>
)

export default SocialLinks
