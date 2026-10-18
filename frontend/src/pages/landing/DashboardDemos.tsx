import { Grid } from '@mui/material'
import {
  AssessmentRounded,
  CalendarMonthRounded,
  DashboardRounded,
  FaceRounded,
  MonitorHeartRounded,
  SelfImprovementRounded,
  SettingsRounded,
  TimelineRounded,
} from '@mui/icons-material'
import { ContainerBox } from './components'
import { DemoCard, SectionTitle } from './components'

// Módulos de la plataforma, en el orden en que el paciente los vive.
const MODULOS = [
  { icon: MonitorHeartRounded, name: 'CAREband', description: 'FC, HRV, EDA y SpO₂ en vivo desde la banda.' },
  { icon: TimelineRounded, name: 'Monitoreo', description: 'Registro de episodios de estrés con semáforo y evolución semanal.' },
  { icon: SelfImprovementRounded, name: 'Autorregulación', description: 'Pausas activas guiadas y video-guías de tu psicólogo.' },
  { icon: CalendarMonthRounded, name: 'Citas', description: 'Reserva con tu psicólogo y entra a la videollamada sin salir de la app.' },
  { icon: FaceRounded, name: 'Avatar', description: 'Tu clima emocional, XP e insignias que crecen con tus hábitos.' },
  { icon: DashboardRounded, name: 'Mi Panel', description: 'Agenda, citas del día y pacientes para el profesional.' },
  { icon: SettingsRounded, name: 'Gestión', description: 'Empresas, psicólogos y pacientes con CRUD completo.' },
  { icon: AssessmentRounded, name: 'Reportes', description: 'Exporta la información almacenada en PDF, CSV o JSON.' },
]

// Sección "Plataforma": rejilla de módulos.
const DashboardDemos = () => (
  <ContainerBox sx={{ py: { xs: 6, md: 9 } }}>
    <span id="modulos" style={{ scrollMarginTop: '5rem' }} />
    <SectionTitle
      name="La plataforma"
      title="Todo el cuidado, en módulos"
      description="Cada módulo se adapta al rol que inicia sesión: el paciente ve su bienestar, el psicólogo su operación y la empresa sus agregados."
    />
    <Grid container spacing={2}>
      {MODULOS.map((m) => (
        <Grid key={m.name} size={{ xs: 12, sm: 6, md: 3 }}>
          <DemoCard icon={m.icon} name={m.name} description={m.description} />
        </Grid>
      ))}
    </Grid>
  </ContainerBox>
)

export default DashboardDemos
