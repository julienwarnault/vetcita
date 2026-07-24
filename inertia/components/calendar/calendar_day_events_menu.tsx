import { DateTime } from 'luxon'
import { XIcon } from 'lucide-react'
import { cn } from 'tailwind-variants'
import { Menu as BaseMenu } from '@base-ui/react'
import { isValidElement, ReactNode, useState } from 'react'
import { CalendarDayEvent } from './calendar_day_event'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Event } from '~/lib/calendar'
import { Button } from '../ui/button'

interface CalendarDayEventsMenuProps {
  day: DateTime
  children: ReactNode
  events: Event[]
  onEventClick?: (event: Event) => void
}

export function CalendarDayEventsMenu(props: CalendarDayEventsMenuProps) {
  const { day, events, children, onEventClick } = props

  const [isOpen, setIsOpen] = useState(false)

  return (
    <BaseMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      {isValidElement(children) && (
        <BaseMenu.Trigger delay={300} render={children} onMouseDown={(e) => e.stopPropagation()} />
      )}

      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={-40} side="top" positionMethod="fixed" className="z-50">
          <BaseMenu.Popup
            className={cn(
              'border bg-surface rounded-xl shadow-xl overflow-hidden w-60',
              'transition-opacity duration-200 ease-out',
              'data-starting-style:opacity-0 data-closed:opacity-0 data-open:opacity-100'
            )}
            onMouseDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="flex flex-col gap-3 px-5 py-4.5 max-h-200 overflow-auto">
              <div className="flex justify-between items-center py-1">
                <div className="text-[15px]/5 font-semibold">
                  {day.setLocale(DEFAULT_LOCALE).toFormat('ccc, d LLL')}
                </div>
                <Button size="icon-sm" variant="tertiary" className="-m-2" onClick={() => setIsOpen(false)}>
                  <XIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {events.map((event) => (
                  <CalendarDayEvent key={event.id} event={event} onEventClick={onEventClick} />
                ))}
              </div>
            </div>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  )
}
