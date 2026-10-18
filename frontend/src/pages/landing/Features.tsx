import { Grid } from '@mui/material'
import {
  EmojiEventsRounded,
  GroupsRounded,
  LockRounded,
  WatchRounded,
} from '@mui/icons-material'
import { ContainerBox } from './components'
import { DemoCard, SectionTitle } from './components'

const PILARES = [
  { icon: WatchRounded, name: 'Datos fisiológicos reales', description: 'CAREband alimenta el semáforo de estrés con señal en vivo, no con formularios.' },
  { icon: GroupsRounded, name: 'Un módulo, cuatro roles', description: 'La misma arquitectura de dominio se renderiza distinto para paciente, psicólogo, empresa y admin.' },
  { icon: EmojiEventsRounded, name: 'Gamificación con propósito', description: 'El avatar, el XP y las insignias responden a hábitos reales: pausas, registros y citas.' },
  { icon: LockRounded, name: 'Privacidad por diseño', description: 'La empresa ve agregados anonimizados; el detalle clínico solo con consentimiento.' },
]

// Pilares del producto.
const Features = () => (
  <ContainerBox sx={{ py: { xs: 6, md: 9 } }}>
    <span id="features" style={{ scrollMarginTop: '5rem' }} />
    <SectionTitle
      name="Por qué ATEMPO"
      title="Diseñado para el cuidado, no para el ruido"
      description="Tecnología que se queda en segundo plano para que la atención esté en la persona."
    />
    <Grid container spacing={2}>
      {PILARES.map((p) => (
        <Grid key={p.name} size={{ xs: 12, sm: 6, md: 3 }}>
          <DemoCard icon={p.icon} name={p.name} description={p.description} />
        </Grid>
      ))}
    </Grid>
  </ContainerBox>
)

export default Features
