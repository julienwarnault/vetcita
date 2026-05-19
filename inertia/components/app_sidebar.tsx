import { cn } from 'tailwind-variants'
import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { DynamicIcon } from 'lucide-react/dynamic'
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
    route: 'calendar',
    navigationIcon: 'calendar',
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
] as const

export function AppSidebar() {
  const { url } = usePage<Data.SharedProps>()

  return (
    <aside className="flex h-full w-18 shrink-0 flex-col bg-primary">
      <div className="flex flex-1 flex-col items-center overflow-x-hidden overflow-y-auto py-2">
        {NAVIGATION.map((item, index) => {
          const isActive = url.startsWith(urlFor(item.route))

          return (
            <div key={index} className="py-1">
              <Tooltip
                placement="left"
                trigger={
                  <Link
                    route={item.route}
                    aria-label={item.name}
                    title={item.name}
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-lg text-white',
                      isActive ? 'bg-accent hover:bg-accent-faded' : 'hover:bg-primary-faded'
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
