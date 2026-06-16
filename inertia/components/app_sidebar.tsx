import { cn } from 'tailwind-variants'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Tooltip } from './ui/tooltip'
import { urlFor } from '~/lib/tuyau'

const NAVIGATION = [
  {
    name: 'Inicio',
    route: 'dashboard',
    navigationIcon: 'house',
  },
  {
    name: 'Calendario',
    route: 'show_calendar.render',
    navigationIcon: 'calendar',
  },
  {
    name: 'Pacientes',
    route: 'list_patients.render',
    navigationIcon: 'contact-round',
  },
  {
    name: 'Tipos de cita',
    route: 'list_appointment_types.render',
    navigationIcon: 'book-open',
  },
  {
    name: 'Agendas',
    route: 'list_agendas.render',
    navigationIcon: 'users',
  },
  {
    name: 'Ajustes',
    route: 'settings',
    navigationIcon: 'settings',
  },
] as const

export function AppSidebar() {
  const { url } = usePage<Data.SharedProps>()

  const [calendarView] = useLocalStorage<Record<string, any>>('calendar_view', {})

  return (
    <aside className="flex h-full w-18 shrink-0 flex-col bg-primary">
      <div className="flex flex-1 flex-col items-center overflow-x-hidden overflow-y-auto py-2">
        {NAVIGATION.map((item, index) => {
          const isActive = url.startsWith(urlFor(item.route))
          const isCalendar = item.route == 'show_calendar.render'

          return (
            <div key={index} className="py-1">
              <Tooltip
                placement="left"
                trigger={
                  <Link
                    href={urlFor(item.route, {}, isCalendar ? { qs: calendarView } : {})}
                    aria-label={item.name}
                    title={item.name}
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-lg text-white',
                      isActive ? 'bg-accent hover:bg-accent/80' : 'hover:bg-primary-faded'
                    )}
                  >
                    <DynamicIcon name={item.navigationIcon} size={26} strokeWidth={1.5} />
                  </Link>
                }
                size="md"
                hideArrow={false}
                sideOffset={24}
              >
                {item.name}
              </Tooltip>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
