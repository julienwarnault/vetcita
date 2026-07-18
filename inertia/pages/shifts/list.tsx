import { useMemo } from 'react'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { DateTime, Interval } from 'luxon'
import { useModalStack } from '@inertiaui/modal-react'
import { CalendarDatePicker } from '~/components/calendar/calendar_date_picker'
import { DEFAULT_TIMEZONE, eachDayOfInterval, today } from '~/lib/date'
import { ShiftTable } from '~/components/shift/shifts_table'
import { ViewHeader } from '~/components/view_header'
import { Button } from '~/components/ui/button'
import { Menu } from '~/components/ui/menu'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  date: string
  agendas: Data.Agendas.Agenda[]
  shifts: Data.Scheduling.Shift[]
  closedDates: Data.Scheduling.ClosedDate[]
}>

export default function List(props: PageProps) {
  const { date, agendas, shifts, closedDates } = props

  const { visitModal } = useModalStack()

  const minValue = useMemo(() => DateTime.fromISO(date).startOf('week'), [date])
  const maxValue = useMemo(() => DateTime.fromISO(date).endOf('week'), [date])
  const dates = useMemo(() => eachDayOfInterval({ start: minValue, end: maxValue }), [minValue, maxValue])

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
        <ViewHeader title="Turnos programados">
          <Menu
            trigger={
              <Button size="lg">
                Añadir <Menu.TriggerIcon />
              </Button>
            }
          >
            <Menu.Item onClick={() => visitModal(urlFor('create_closed_date.render'))}>Fechas de cierre</Menu.Item>
            <Menu.Item onClick={() => visitModal(urlFor('create_agenda.render'))}>Nueva agenda</Menu.Item>
          </Menu>
        </ViewHeader>
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

            <ShiftTable
              dates={dates}
              agendas={agendas}
              shifts={shifts.map((shift) => ({
                date: shift.date,
                agendaId: shift.agendaId,
                start: DateTime.fromISO(shift.start!, { zone: DEFAULT_TIMEZONE }),
                end: DateTime.fromISO(shift.end!, { zone: DEFAULT_TIMEZONE }),
              }))}
              closedDates={closedDates.map((closedDate) => ({
                id: closedDate.id,
                description: closedDate.description,
                interval: Interval.fromDateTimes(
                  DateTime.fromISO(closedDate.start!).startOf('day'),
                  DateTime.fromISO(closedDate.end!).endOf('day')
                ),
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
