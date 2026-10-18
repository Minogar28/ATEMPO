import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router'
import PageMetaData from './PageMetaData'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface PageBreadcrumbProps {
  title: string
  items?: BreadcrumbItem[]
}

const PageBreadcrumb = ({ title, items = [] }: PageBreadcrumbProps) => (
  <Box sx={{ mb: 3 }}>
    <PageMetaData title={title} />
    <Typography variant="h5" component="h1" gutterBottom>
      {title}
    </Typography>
    {items.length > 0 && (
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) =>
          item.to && index < items.length - 1 ? (
            <Link
              key={item.label}
              component={RouterLink}
              to={item.to}
              underline="hover"
              color="inherit"
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={item.label} color="text.secondary" variant="body2">
              {item.label}
            </Typography>
          ),
        )}
      </Breadcrumbs>
    )}
  </Box>
)

export default PageBreadcrumb
