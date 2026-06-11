import { capitalize, formatPhoneNumber } from '~/lib/utils'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Event } from '~/lib/calendar'
import { Drawer } from '../ui/drawer'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'

interface CalendarEventDrawerProps {
  event: Event | null
  open: boolean
  onClose?: () => void
}

export function CalendarEventDrawer(props: CalendarEventDrawerProps) {
  const { event, open, onClose } = props

  return (
    <Drawer open={open} onOpenChange={(state) => !state && onClose?.()}>
      {event && (
        <>
          {event.patient && (
            <Drawer.LeftPanel>
              <Drawer.Body>
                <div className="flex flex-col items-center">
                  <Avatar size="4xl" className="mb-3" fullName={event.patient.fullName} />
                  <div className="text-[17px]/6 font-medium pb-1">{event.patient.fullName}</div>
                  {event.patient.email && (
                    <div className="text-[15px]/5 text-muted">{event.patient.email}</div>
                  )}
                  <div className="text-[15px]/5 text-muted">
                    {formatPhoneNumber(event.patient.phone)}
                  </div>
                </div>
              </Drawer.Body>
            </Drawer.LeftPanel>
          )}

          <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
            <Drawer.Header>
              <div className="flex justify-between gap-4 p-8 bg-[#208901]">
                <div className="flex flex-col">
                  <h1 className="text-[28px]/9 font-semibold text-white">
                    {capitalize(event.start.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL'))}
                  </h1>

                  <div className="text-sm font-normal text-white">
                    {event.start.toFormat('h:mma').toLowerCase()} • {event.bookingRef}
                  </div>
                </div>
                <div>
                  <Button variant="secondary" className="text-white border-white bg-transparent">
                    Reservada
                  </Button>
                </div>
              </div>
            </Drawer.Header>
            <Drawer.Body>
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Examen</h2>
                <div className="flex items-center gap-4">
                  <div
                    className="w-1 h-auto rounded-full self-stretch shrink-0"
                    style={{ backgroundColor: event.color }}
                  />
                  <div className="flex flex-col gap-1 py-2">
                    <div className="text-[17px]/6 font-medium">{event.typeName}</div>

                    <div className="text-[15px]/5 text-foreground">
                      {`${event.start.toFormat('h:mma')} - ${event.end.toFormat('h:mma')}`.toLowerCase()}
                    </div>
                  </div>
                </div>
              </div>
            </Drawer.Body>
          </Drawer.MainPanel>
        </>
      )}
    </Drawer>
  )
}
