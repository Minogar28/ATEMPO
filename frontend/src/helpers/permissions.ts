import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded'
import ApartmentRounded from '@mui/icons-material/ApartmentRounded'
import AssessmentRounded from '@mui/icons-material/AssessmentRounded'
import CalendarMonthRounded from '@mui/icons-material/CalendarMonthRounded'
import FolderRounded from '@mui/icons-material/FolderRounded'
import HomeRounded from '@mui/icons-material/HomeRounded'
import ManageAccountsRounded from '@mui/icons-material/ManageAccountsRounded'
import MedicalServicesRounded from '@mui/icons-material/MedicalServicesRounded'
import MonitorHeartRounded from '@mui/icons-material/MonitorHeartRounded'
import SelfImprovementRounded from '@mui/icons-material/SelfImprovementRounded'
import SettingsRounded from '@mui/icons-material/SettingsRounded'
import TimelineRounded from '@mui/icons-material/TimelineRounded'
import AvatarMenuIcon from '@src/components/AvatarMenuIcon'
import type { MenuIcon } from './menu'

// Rutas a las que siempre puede entrar un usuario autenticado.
export const ALWAYS_ALLOWED_PATHS = ['/home']

const MODULE_ICONS: Record<string, MenuIcon> = {
  home: HomeRounded,
  careband: MonitorHeartRounded,
  monitoreo: TimelineRounded,
  autorregulacion: SelfImprovementRounded,
  agenda: CalendarMonthRounded,
  avatar: AvatarMenuIcon,
  'mi-panel': MedicalServicesRounded,
  empresa: ApartmentRounded,
  gestion: ManageAccountsRounded,
  reportes: AssessmentRounded,
  cuenta: AccountCircleRounded,
  settings: SettingsRounded,
}

export const iconoModulo = (key: string): MenuIcon =>
  MODULE_ICONS[key] ?? FolderRounded
