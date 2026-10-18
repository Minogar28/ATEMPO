import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/es'
import type { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { brandTokens } from '@src/theme/brand'
import { bodyFont, displayFont, monoFont } from '@src/theme/typography'

// Wrapper de FullCalendar con el tema ATEMPO (navy + vidrio + mustard).
// Se usa en Mi Panel → Mi agenda para abrir/quitar bloques de disponibilidad.

export interface AgendaCalendarProps {
  events: EventInput[]
  onSelect: (start: Date, end: Date) => void
  onEventClick: (arg: EventClickArg) => void
}

const calendarTheme = {
  '& .fc': {
    fontFamily: bodyFont,
    '--fc-border-color': 'rgba(255,255,255,0.08)',
    '--fc-page-bg-color': 'transparent',
    '--fc-neutral-bg-color': 'rgba(255,255,255,0.04)',
    '--fc-today-bg-color': alpha(brandTokens.mustard, 0.07),
    '--fc-highlight-color': alpha(brandTokens.mustard, 0.15),
    '--fc-list-event-hover-bg-color': 'rgba(255,255,255,0.05)',
    '--fc-non-business-color': 'transparent',
    '--fc-now-indicator-color': brandTokens.mustard,
  },
  // Cabecera con título y botones de vista
  '& .fc .fc-toolbar': { flexWrap: 'wrap', gap: '8px', mb: '14px' },
  '& .fc .fc-toolbar-title': {
    fontFamily: displayFont,
    fontSize: '1.05rem',
    color: brandTokens.cream,
  },
  '& .fc .fc-button': {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '10px',
    color: alpha(brandTokens.cream, 0.75),
    fontSize: '0.7rem',
    textTransform: 'capitalize',
    padding: '5px 12px',
    boxShadow: 'none',
    '&:hover': { background: 'rgba(255,255,255,0.1)', color: brandTokens.cream },
    '&:focus': { boxShadow: 'none' },
    '&.fc-button-active': {
      background: alpha(brandTokens.mustard, 0.18),
      borderColor: alpha(brandTokens.mustard, 0.5),
      color: brandTokens.mustard,
    },
  },
  '& .fc .fc-button-group > .fc-button': { borderRadius: 0 },
  '& .fc .fc-button-group > .fc-button:first-of-type': { borderRadius: '10px 0 0 10px' },
  '& .fc .fc-button-group > .fc-button:last-of-type': { borderRadius: '0 10px 10px 0' },
  // Celdas y etiquetas
  '& .fc .fc-col-header-cell': {
    background: 'rgba(255,255,255,0.03)',
    py: '6px',
  },
  '& .fc .fc-col-header-cell-cushion, & .fc .fc-daygrid-day-number': {
    color: alpha(brandTokens.cream, 0.6),
    fontSize: '0.68rem',
    fontWeight: 500,
    textDecoration: 'none',
    padding: '4px 8px',
    textTransform: 'capitalize',
  },
  '& .fc .fc-daygrid-day:hover .fc-daygrid-day-number': { color: brandTokens.mustard },
  '& .fc .fc-timegrid-slot-label-cushion': {
    fontFamily: monoFont,
    fontSize: '0.6rem',
    color: alpha(brandTokens.cream, 0.4),
  },
  '& .fc .fc-timegrid-axis-cushion': { color: alpha(brandTokens.cream, 0.4), fontSize: '0.62rem' },
  // Eventos
  '& .fc .fc-event': {
    borderRadius: '8px',
    fontSize: '0.68rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid',
    padding: '1px 5px',
  },
  '& .fc .fc-daygrid-event-dot': { display: 'none' },
  '& .fc .fc-event-title': { fontWeight: 500 },
  '& .fc .fc-daygrid-event': { margin: '1px 3px' },
  // Vistas
  '& .fc .fc-day-today': { background: 'var(--fc-today-bg-color)' },
  '& .fc .fc-timegrid-now-indicator-arrow': { borderColor: 'var(--fc-now-indicator-color)' },
  '& .fc .fc-list-day-cushion': { background: 'rgba(255,255,255,0.04)' },
  '& .fc .fc-list-day-text, & .fc .fc-list-day-side': {
    color: alpha(brandTokens.cream, 0.6),
    fontSize: '0.7rem',
    textDecoration: 'none',
  },
  '& .fc .fc-list-empty': { background: 'transparent', color: alpha(brandTokens.cream, 0.4) },
  // Selección al arrastrar
  '& .fc .fc-highlight': { background: 'var(--fc-highlight-color)' },
} as const

const AgendaCalendar = ({ events, onSelect, onEventClick }: AgendaCalendarProps) => {
  const handleSelect = (arg: DateSelectArg) => onSelect(arg.start, arg.end)

  return (
    <Box sx={calendarTheme}>
      <FullCalendar
        initialView="timeGridWeek"
        locale={esLocale}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        buttonText={{ today: 'Hoy', month: 'Mes', week: 'Semana', list: 'Lista' }}
        height={560}
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        slotDuration="01:00:00"
        allDaySlot={false}
        nowIndicator
        selectable
        selectMirror
        dayMaxEventRows={3}
        events={events}
        select={handleSelect}
        eventClick={onEventClick}
      />
    </Box>
  )
}

export default AgendaCalendar
