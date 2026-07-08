import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import { PencilIcon } from 'lucide-react'
import { CalendarDatePicker } from '~/components/calendar/calendar_date_picker'
import { DEFAULT_LOCALE, eachDayOfInterval, today } from '~/lib/date'
import { ViewHeader } from '~/components/view_header'
import { Button } from '~/components/ui/button'
import { Avatar } from '~/components/ui/avatar'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  date: string
  agendas: Data.Agendas.Agenda[]
  workingHours: Data.Scheduling.WorkingHour[]
}>

export default function List(props: PageProps) {
  const { date, agendas, workingHours } = props

  const minValue = useMemo(() => DateTime.fromISO(date).startOf('week'), [date])
  const maxValue = useMemo(() => DateTime.fromISO(date).endOf('week'), [date])
  const days = useMemo(() => eachDayOfInterval({ start: minValue, end: maxValue }), [minValue, maxValue])

  function navigate(newDate: string) {
    const qs: Record<string, any> = { date: newDate }

    router.get(urlFor('list_shifts.render', {}, { qs }), {}, { preserveState: true })
  }

  function onChangeDate(newDate: DateTime) {
    navigate(newDate.toFormat('yyyy-MM-dd'))
  }

  return (
    <div className="flex">
      <div className="container-xl p-10">
        <ViewHeader title="Turnos programados"></ViewHeader>
        <div className="flex flex-col pb-20">
          <div className="flex flex-col">
            <div className="flex justify-between gap-3 p-4 mb-4 rounded-xl bg-background">
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => onChangeDate(today())}>
                  Esta semana
                </Button>

                <CalendarDatePicker date={date} view="week" numberOfMonths={1} onDateChange={onChangeDate} />
              </div>
            </div>

            <table className="border-separate border-spacing-0">
              <colgroup>
                <col className="w-75 min-w-75"></col>
                {days.map((day) => (
                  <col key={day.toUnixInteger()} className="min-w-37.5"></col>
                ))}
              </colgroup>
              <thead>
                <tr>
                  <th className="px-4">
                    <div className="text-left mb-1">
                      <div className="text-[15px]/5 font-semibold">Agendas</div>
                    </div>
                  </th>
                  {days.map((day) => {
                    return (
                      <th key={day.toUnixInteger()} className="px-4">
                        <div className="p-2 mb-1 cursor-pointer hover:bg-background rounded-xl">
                          <div className="text-[15px]/5 font-semibold">
                            {day.setLocale(DEFAULT_LOCALE).toFormat('ccc, d LLL')}
                          </div>
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {agendas.map((agenda) => {
                  const agendaWorkingHours = workingHours.filter(({ agendaId }) => agendaId === agenda.id)

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
                      {days.map((day, j) => {
                        const dayWorkingHours = agendaWorkingHours.filter(({ dayOfWeek }) => dayOfWeek === day.weekday)

                        return (
                          <td
                            key={day.toUnixInteger()}
                            className={cn(
                              'border-r border-b min-w-37.5 p-1 content-start group-first:border-t',
                              j == 6 && 'group-first:rounded-tr-xl group-last:rounded-br-xl'
                            )}
                          >
                            <div className="flex flex-col gap-1">
                              {dayWorkingHours.map((wh) => {
                                const [startH, startM] = wh.startTime.split(':').map(Number)
                                const [endH, endM] = wh.endTime.split(':').map(Number)

                                const start = day.set({ hour: startH, minute: startM, second: 0, millisecond: 0 })
                                const end = day.set({ hour: endH, minute: endM, second: 0, millisecond: 0 })
                                return (
                                  <div key={wh.id} className="bg-accent/10 rounded-lg px-4 py-3">
                                    <div className="text-[13px]/4 font-normal">
                                      {`${start.toFormat('h:mma')} - ${end.toFormat('h:mma')}`.toLowerCase()}
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
          </div>
        </div>
      </div>
    </div>
  )
}
