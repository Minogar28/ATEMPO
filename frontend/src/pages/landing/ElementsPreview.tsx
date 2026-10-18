import { Grid } from '@mui/material'
import {
  BusinessRounded,
  FaceRounded,
  MedicalServicesRounded,
  SecurityRounded,
} from '@mui/icons-material'
import { ContainerBox } from './components'
import { DemoCard, SectionTitle } from './components'

const ROLES = [
  { icon: FaceRounded, name: 'Paciente', description: 'Monitoreo, pausas, citas y un avatar que refleja tu clima real.' },
  { icon: MedicalServicesRounded, name: 'Psicólogo', description: 'Agenda con disponibilidad, pacientes asignados y guías en video.' },
  { icon: BusinessRounded, name: 'Administrador de empresa', description: 'KPIs agregados y anonimizados del programa de bienestar.' },
  { icon: SecurityRounded, name: 'Superadministrador', description: 'Gestión completa de empresas, psicólogos y pacientes.' },
]

// Los cuatro roles de la plataforma.
const ElementsPreview = () => (
  <ContainerBox sx={{ py: { xs: 6, md: 9 } }}>
    <span id="roles" style={{ scrollMarginTop: '5rem' }} />
    <SectionTitle
      name="Roles"
      title="Cada quien entra a su espacio"
      description="El menú y los módulos se adaptan automáticamente al rol elegido al iniciar sesión."
    />
    <Grid container spacing={2}>
      {ROLES.map((r) => (
        <Grid key={r.name} size={{ xs: 12, sm: 6, md: 3 }}>
          <DemoCard icon={r.icon} name={r.name} description={r.description} />
        </Grid>
      ))}
    </Grid>
  </ContainerBox>
)

export default ElementsPreview
