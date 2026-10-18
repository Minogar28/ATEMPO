import { Helmet } from 'react-helmet-async'
import { APP_NAME } from '@src/config/api'

interface PageMetaDataProps {
  title: string
  description?: string
}

const PageMetaData = ({ title, description }: PageMetaDataProps) => (
  <Helmet>
    <title>{`${title} — ${APP_NAME}`}</title>
    {description && <meta name="description" content={description} />}
  </Helmet>
)

export default PageMetaData
