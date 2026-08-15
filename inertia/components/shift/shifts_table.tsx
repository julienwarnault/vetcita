import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import { DateTime, Interval } from 'luxon'
import { useModalStack } from '@inertiaui/modal-react'
import { CirclePlusIcon, PencilIcon } from 'lucide-react'
import { containsDay, DEFAULT_LOCALE } from '~/lib/date'
import { Avatar } from '../ui/avatar'
import { groupBy } from '~/lib/utils'
import { Button } from '../ui/button'
import { urlFor } from '~/lib/tuyau'
import { Menu } from '../ui/menu'

interface ShiftTableProps {
  dates: Array<DateTime>
  agendas: Array<{
    id: string
    fullName: string
    color: string
  }>
  shifts: Array<{
    agendaId: string
    date: string
    start: DateTime
    end: DateTime
  }>
  scheduleDays: Array<{
    id: string
    agendaId: string
    date: string
  }>
  closedDates: Array<{
    id: string
    interval: Interval
    description?: string | null
  }>
  timeOffs: Array<{
    id: string
    agendaId: string
    type: string
    interval: Interval
  }>
}

const OFF_BLOCK_CLASS = 'stripes bg-[#d3d3d3] hover:bg-border-strong ring ring-border rounded-lg'

function formatTimeRange(start: DateTime, end: DateTime) {
  return `${start.toFormat('h:mma')} - ${end.toFormat('h:mma')}`.toLowerCase()
}

export function ShiftTable(props: ShiftTableProps) {
  const { dates, agendas, shifts, scheduleDays, closedDates, timeOffs } = props

  const { visitModal } = useModalStack()

  const shiftsByAgenda = groupBy(shifts, (s) => s.agendaId)
  const scheduleDaysByAgenda = groupBy(scheduleDays, (t) => t.agendaId)
  const timeOffsByAgenda = groupBy(timeOffs, (t) => t.agendaId)
  const closedEventByDate = new Map(
    dates.map((date) => [date.toISODate()!, closedDates.find((cd) => cd.interval.contains(date))])
  )

  function handleEditDay(agendaId: string, date: DateTime, scheduledDayId?: string) {
    if (scheduledDayId) {
      visitModal(urlFor('update_schedule_day.render', { id: scheduledDayId }))
    } else {
      visitModal(urlFor('create_schedule_day.render', {}, { qs: { date: date.toISODate(), agendaId } }))
    }
  }

  return (
    <table className="border-separate border-spacing-0 h-1">
      <colgroup>
        <col className="w-75 min-w-75"></col>
        {dates.map((date) => (
          <col key={date.toUnixInteger()} className="w-37.5"></col>
        ))}
      </colgroup>
      <thead>
        <tr>
          <th className="px-4">
            <div className="text-left mb-1">
              <div className="text-[15px]/5 font-semibold">Veterinarios</div>
            </div>
          </th>
          {dates.map((date) => (
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
          ))}
        </tr>
      </thead>
      <tbody>
        {agendas.map((agenda, agendaIndex) => {
          const agendaShifts = shiftsByAgenda.get(agenda.id) ?? []
          const agendaTimeOffs = timeOffsByAgenda.get(agenda.id) ?? []
          const agendaScheduleDays = scheduleDaysByAgenda.get(agenda.id) ?? []
          const isFirstAgenda = agendaIndex === 0

          return (
            <tr key={agenda.id} className="group bg-white">
              <td
                className="content-start border-l border-r border-b p-4 cursor-pointer hover:bg-background group-first:border-t group-first:rounded-tl-xl group-last:rounded-bl-xl"
                onClick={() => visitModal(urlFor('update_working_hours.render', { agendaId: agenda.id }))}
              >
                <div className="flex gap-2">
                  <div className="flex flex-1 items-center gap-3">
                    <Avatar fullName={agenda.fullName} color={agenda.color} size="sm" />
                    <div>
                      <div className="text-[15px]/5 font-semibold">{agenda.fullName}</div>
                    </div>
                  </div>
                  <Button size="icon-sm" variant="tertiary">
                    <PencilIcon size={20} />
                  </Button>
                </div>
              </td>
              {dates.map((date, dateIndex) => {
                const isoDate = date.toISODate()!
                const isLastDate = dateIndex === dates.length - 1
                const closedEvent = closedEventByDate.get(isoDate)
                const isClosed = !!closedEvent

                if (!isFirstAgenda && isClosed) return null

                const dateShifts = agendaShifts.filter((s) => s.date === isoDate)
                const dateTimeOffs = agendaTimeOffs.filter((t) => containsDay(t.interval, date))
                const isNoWorkDay = dateShifts.length === 0 && dateTimeOffs.length === 0

                const scheduleDayId = agendaScheduleDays.find((s) => s.date === isoDate)?.id

                return (
                  <td
                    key={`${agenda.id}:${isoDate}`}
                    rowSpan={isClosed ? agendas.length : undefined}
                    className={cn(
                      'border-r border-b min-w-37.5 p-1 content-start group-first:border-t',
                      isLastDate && 'group-first:rounded-tr-xl group-last:rounded-br-xl'
                    )}
                  >
                    <div className="flex gap-1 flex-col justify-start w-full h-full">
                      <div className={cn('flex gap-1 flex-col justify-start empty:hidden', isClosed && 'h-full')}>
                        {closedEvent && (
                          <button
                            className={cn('flex justify-center items-center h-full w-full', OFF_BLOCK_CLASS)}
                            onClick={() => visitModal(urlFor('update_closed_date.render', { id: closedEvent.id }))}
                          >
                            <div className="text-[13px]/4 font-normal">{closedEvent.description ?? 'Cerrado'}</div>
                          </button>
                        )}
                        {dateTimeOffs.map((timeOff) => {
                          const isFirstDateOfTimeOff = timeOff.interval.start?.hasSame(date, 'day')
                          const span = isFirstDateOfTimeOff ? timeOff.interval.count('days') : 1

                          if (!isFirstDateOfTimeOff && isClosed) return null

                          if (!isFirstDateOfTimeOff) {
                            return <div key={timeOff.id} className="w-full h-10"></div>
                          }

                          return (
                            <Menu
                              key={timeOff.id}
                              align="start"
                              trigger={
                                <button
                                  disabled={!isFirstDateOfTimeOff}
                                  className={cn(
                                    'flex flex-col items-center px-2 py-1 overflow-hidden',
                                    OFF_BLOCK_CLASS
                                  )}
                                  style={{ width: `calc(${100 * span}% + ${8 * (span - 1)}px)`, zIndex: span }}
                                >
                                  <div className="text-[13px]/4 font-semibold line-clamp-1">{timeOff.type}</div>
                                  <div className="text-[13px]/4 font-normal">
                                    {formatTimeRange(timeOff.interval.start!, timeOff.interval.end!)}
                                  </div>
                                </button>
                              }
                            >
                              <Menu.Item
                                onClick={() => visitModal(urlFor('update_time_off.render', { id: timeOff.id }))}
                              >
                                Editar días libres
                              </Menu.Item>
                              <Menu.Item
                                variant="destructive"
                                onClick={() => router.delete(urlFor('delete_time_off.execute', { id: timeOff.id }))}
                              >
                                Eliminar días libres
                              </Menu.Item>
                            </Menu>
                          )
                        })}
                        {dateShifts.map((shift, i) => (
                          <Menu
                            key={`${agenda.id}:${isoDate}:shift:${i}`}
                            align="start"
                            trigger={
                              <button className="bg-accent/10 rounded-lg px-4 py-3 hover:bg-accent/20">
                                <div className="text-[13px]/4 font-normal">
                                  {formatTimeRange(shift.start, shift.end)}
                                </div>
                              </button>
                            }
                          >
                            <Menu.Item onClick={() => handleEditDay(agenda.id, date, scheduleDayId)}>
                              Editar este día
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => {
                                visitModal(
                                  urlFor('create_time_off.render', null, {
                                    qs: { initialDate: isoDate, initialAgendaId: agenda.id },
                                  })
                                )
                              }}
                            >
                              Añadir días libres
                            </Menu.Item>
                          </Menu>
                        ))}
                      </div>
                      {!isClosed && (
                        <div className="group/buttons h-full">
                          <Menu
                            align="start"
                            trigger={
                              <button
                                className={cn(
                                  'group/button h-10 w-full rounded-lg overflow-hidden',
                                  !isNoWorkDay && 'opacity-0 group-hover/buttons:opacity-100'
                                )}
                              >
                                <div
                                  className={cn(
                                    'flex items-center justify-center w-full h-full bg-accent/5 text-accent group-hover/button:flex',
                                    isNoWorkDay && 'hidden'
                                  )}
                                >
                                  <CirclePlusIcon size={18} />
                                </div>
                                {isNoWorkDay && (
                                  <div className="flex items-center justify-center w-full h-full bg-border group-hover/button:hidden">
                                    <span className="text-[13px]/4 font-normal text-muted">No está trabajando</span>
                                  </div>
                                )}
                              </button>
                            }
                          >
                            <Menu.Item onClick={() => handleEditDay(agenda.id, date, scheduleDayId)}>
                              Editar este día
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                visitModal(
                                  urlFor('create_time_off.render', null, {
                                    qs: { initialDate: isoDate, initialAgendaId: agenda.id },
                                  })
                                )
                              }
                            >
                              Añadir días libres
                            </Menu.Item>
                          </Menu>
                        </div>
                      )}
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
