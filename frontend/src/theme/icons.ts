import AirRounded from '@mui/icons-material/AirRounded'
import ApartmentRounded from '@mui/icons-material/ApartmentRounded'
import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded'
import BadgeRounded from '@mui/icons-material/BadgeRounded'
import BedtimeRounded from '@mui/icons-material/BedtimeRounded'
import DirectionsWalkRounded from '@mui/icons-material/DirectionsWalkRounded'
import EventAvailableRounded from '@mui/icons-material/EventAvailableRounded'
import FavoriteRounded from '@mui/icons-material/FavoriteRounded'
import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded'
import GroupsRounded from '@mui/icons-material/GroupsRounded'
import HowToRegRounded from '@mui/icons-material/HowToRegRounded'
import LocalFireDepartmentRounded from '@mui/icons-material/LocalFireDepartmentRounded'
import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import PsychologyAltRounded from '@mui/icons-material/PsychologyAltRounded'
import PsychologyRounded from '@mui/icons-material/PsychologyRounded'
import SelfImprovementRounded from '@mui/icons-material/SelfImprovementRounded'
import SpeedRounded from '@mui/icons-material/SpeedRounded'
import ThermostatRounded from '@mui/icons-material/ThermostatRounded'
import VerifiedRounded from '@mui/icons-material/VerifiedRounded'
import VolunteerActivismRounded from '@mui/icons-material/VolunteerActivismRounded'
import WaterDropRounded from '@mui/icons-material/WaterDropRounded'
import WhatshotRounded from '@mui/icons-material/WhatshotRounded'
import type { SvgIconComponent } from '@mui/icons-material'

// Un icono por métrica: cada KPI se ve igual en Inicio, Mi Panel, Empresas y
// CAREband. Las claves coinciden con los id de METRICA_EXPLICACIONES.
export const METRIC_ICONS: Record<string, SvgIconComponent> = {
  // Bienestar
  sesiones: SelfImprovementRounded,
  racha: LocalFireDepartmentRounded,
  estres: PsychologyRounded,
  xp: AutoAwesomeRounded,
  // Operación
  pacientes: GroupsRounded,
  citas: EventAvailableRounded,
  guias: MenuBookRounded,
  empresas: ApartmentRounded,
  psicologos: PsychologyAltRounded,
  empleados: BadgeRounded,
  activos: HowToRegRounded,
  participacion: VolunteerActivismRounded,
  // Signos vitales
  fc: FavoriteRounded,
  spo2: AirRounded,
  temp: ThermostatRounded,
  gsr: WaterDropRounded,
  hrv: GraphicEqRounded,
  presion: SpeedRounded,
  sueno: BedtimeRounded,
  pasos: DirectionsWalkRounded,
  calorias: WhatshotRounded,
  estado: VerifiedRounded,
}
