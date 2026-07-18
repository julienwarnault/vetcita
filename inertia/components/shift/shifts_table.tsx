import { cn } from 'tailwind-variants'
import { PencilIcon } from 'lucide-react'
import { router } from '@inertiajs/react'
import { DateTime, Interval } from 'luxon'
import { useModalStack } from '@inertiaui/modal-react'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import { urlFor } from '~/lib/tuyau'

interface ShiftTableProps {
  dates: Array<DateTime>
  agendas: Array<{
    id: string
    name: string
    color: string
  }>
  shifts: Array<{
    agendaId: string
    date: string
    start: DateTime
    end: DateTime
  }>
  closedDates: Array<{
    id: string
    interval: Interval
    description?: string | null
  }>
}

export function ShiftTable(props: ShiftTableProps) {
  const { dates, agendas, shifts, closedDates } = props

  const { visitModal } = useModalStack()

  return (
    <table className="border-separate border-spacing-0 h-1">
      <colgroup>
        <col className="w-75 min-w-75"></col>
        {dates.map((date) => (
          <col key={date.toUnixInteger()} className="min-w-37.5"></col>
        ))}
      </colgroup>
      <thead>
        <tr>
          <th className="px-4">
            <div className="text-left mb-1">
              <div className="text-[15px]/5 font-semibold">Agendas</div>
            </div>
          </th>
          {dates.map((date) => {
            return (
              <th key={date.toUnixInteger()} className="px-4">
                <button
                  type="button"
                  className="w-full px-2 py-4 mb-1 cursor-pointer hover:bg-background rounded-xl"
                  onClick={() =>
                    visitModal(urlFor('create_closed_date.render', null, { qs: { initialDate: date.toISODate() } }))
                  }
                >
                  <div className="text-[15px]/5 font-semibold">
                    {date.setLocale(DEFAULT_LOCALE).toFormat('ccc, d LLL')}
                  </div>
                </button>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {agendas.map((agenda) => {
          const agendaShifts = shifts.filter(({ agendaId }) => agendaId === agenda.id)

          return (
            <tr key={agenda.id} className="group">
              <td
                className="content-start border-l border-r border-b p-4 cursor-pointer hover:bg-background group-first:border-t group-first:rounded-tl-xl group-last:rounded-bl-xl"
                onClick={() => {
                  router.visit(urlFor('update_working_hours.render', { agendaId: agenda.id }))
                }}
              >
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center gap-3">
                    <Avatar fullName={agenda.name} size="sm" />
                    <div>
                      <div className="text-[15px]/5 font-semibold">{agenda.name}</div>
                    </div>
                  </div>
                  <Button size="icon-sm" variant="tertiary">
                    <PencilIcon size={20} />
                  </Button>
                </div>
              </td>
              {dates.map((date) => {
                const isoDate = date.toISODate()
                const isFirstAgenda = agendas[0]?.id === agenda.id
                const isLastDate = dates[dates.length - 1].hasSame(date, 'day')
                const closedEvent = closedDates.find((closedDate) => closedDate.interval.contains(date))
                const isClosed = !!closedEvent

                const dateShifts = agendaShifts.filter((as) => isoDate == as.date)

                if (!isFirstAgenda && isClosed) return null

                return (
                  <td
                    key={`${agenda.id}:${isoDate}`}
                    rowSpan={isClosed ? agendas.length : undefined}
                    className={cn(
                      'border-r border-b min-w-37.5 p-1 content-start group-first:border-t',
                      isLastDate && 'group-first:rounded-tr-xl group-last:rounded-br-xl'
                    )}
                  >
                    <div className="flex gap-1 flex-col justify-start h-full">
                      {closedEvent && (
                        <button
                          className="flex justify-center items-center h-full w-full stripes bg-[#d3d3d3] rounded-lg"
                          onClick={() => {
                            visitModal(urlFor('update_closed_date.render', { id: closedEvent.id }))
                          }}
                        >
                          <div className="text-[13px]/4 font-normal">{closedEvent?.description ?? 'Cerrado'}</div>
                        </button>
                      )}
                      {dateShifts.map((shift, i) => {
                        return (
                          <div key={`${agenda.id}:${isoDate}:${i}`} className="bg-accent/10 rounded-lg px-4 py-3">
                            <div className="text-[13px]/4 font-normal">
                              {`${shift.start.toFormat('h:mma')} - ${shift.end.toFormat('h:mma')}`.toLowerCase()}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
