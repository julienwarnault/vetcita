import { cn } from 'tailwind-variants'
import { PreviewCard } from '@base-ui/react'
import { isValidElement, ReactNode, useRef, useState } from 'react'
import { formatDuration, formatPhoneNumber } from '~/lib/utils'
import { Event } from '~/lib/calendar'
import { Avatar } from '../ui/avatar'

interface CalendarEventPreviewCardProps {
  children: ReactNode
  event: Event
}

export function CalendarEventPreviewCard(props: CalendarEventPreviewCardProps) {
  const { event, children } = props

  const [open, setOpen] = useState(false)

  const triggerRef = useRef<HTMLAnchorElement>(null)
  const [anchor, setAnchor] = useState<{ getBoundingClientRect: () => DOMRect } | null>(null)

  return (
    <PreviewCard.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen && triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect()
          setAnchor({ getBoundingClientRect: () => rect })
        }
        setOpen(nextOpen)
      }}
    >
      {isValidElement(children) && (
        <PreviewCard.Trigger
          ref={triggerRef}
          delay={300}
          render={children}
          onMouseLeave={() => setOpen(false)}
        />
      )}

      <PreviewCard.Portal>
        <PreviewCard.Positioner
          sideOffset={10}
          side="left"
          positionMethod="fixed"
          anchor={anchor}
          className="z-50"
          collisionAvoidance={{
            side: 'flip',
            align: 'flip',
            fallbackAxisSide: 'start',
          }}
        >
          <PreviewCard.Popup
            className={cn(
              'border bg-surface rounded-xl shadow-xl overflow-hidden w-94',
              'transition-opacity duration-200 ease-out',
              'data-starting-style:opacity-0 data-closed:opacity-0 data-open:opacity-100'
            )}
          >
            <div className="flex flex-col">
              <div
                className="flex items-center justify-between py-3 px-5 h-11 bg-[#208901]"
                style={{ backgroundColor: event.status.color }}
              >
                <div className="text-sm font-medium text-white">
                  {`${event.start.toFormat('h:mma')} - ${event.end.toFormat('h:mma')}`.toLowerCase()}
                </div>
                <div className="text-sm font-medium text-white">{event.status.name}</div>
              </div>
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-center gap-4">
                  <Avatar fullName={event.patient?.fullName} />
                  <div>
                    <div className="text-[17px]/6 font-medium">
                      {event.patient?.fullName || 'Sin cita'}
                    </div>
                    {event.patient?.phone && (
                      <div className="text-sm/5 text-foreground">
                        {formatPhoneNumber(event.patient.phone)}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-[15px]/5 font-medium">{event.typeName}</div>
                    <div className="text-[13px]/4 text-foreground">
                      {formatDuration(event.duration)} • {event.agenda}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  )
}
