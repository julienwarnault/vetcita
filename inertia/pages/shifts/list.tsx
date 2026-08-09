import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useModalStack } from '@inertiaui/modal-react'
import { CalendarDatePicker } from '~/components/calendar/calendar_date_picker'
import { SettingsHeader } from '~/components/settings_header'
import { ShiftTable } from '~/components/shift/shifts_table'
import { ViewHeader } from '~/components/view_header'
import { Button } from '~/components/ui/button'
import { toShiftTable } from '~/lib/scheduling'
import { Menu } from '~/components/ui/menu'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'
import { today } from '~/lib/date'

type PageProps = InertiaProps<{
  date: string
  agendas: Data.Agendas.Agenda[]
  shifts: Data.Scheduling.Shift[]
  closedDates: Data.Scheduling.ClosedDate[]
  scheduleDays: Data.Scheduling.ScheduleDay[]
  timeOffs: Data.Scheduling.TimeOff[]
}>

export default function List(props: PageProps) {
  const { date, agendas, shifts, closedDates, scheduleDays, timeOffs } = props

  const { visitModal } = useModalStack()

  const table = useMemo(() => {
    return toShiftTable({ date, shifts, scheduleDays, closedDates, timeOffs })
  }, [date, shifts, closedDates, scheduleDays, timeOffs])

  function navigate(newDate: string) {
    const qs: Record<string, any> = { date: newDate }
    router.get(urlFor('list_shifts.render', {}, { qs }), {}, { preserveState: true })
  }

  function onChangeDate(newDate: DateTime) {
    navigate(newDate.toFormat('yyyy-MM-dd'))
  }

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container-xl pb-10">
        <SettingsHeader title="Horarios" />

        <ViewHeader title="Horarios" subtitle="Organiza turnos, ausencias y cierres para controlar la disponibilidad.">
          <Menu
            trigger={
              <Button size="lg">
                Añadir <Menu.TriggerIcon />
              </Button>
            }
          >
            <Menu.Item onClick={() => visitModal(urlFor('create_time_off.render'))}>Días libres</Menu.Item>
            <Menu.Item onClick={() => visitModal(urlFor('create_closed_date.render'))}>Fechas de cierre</Menu.Item>
            <Menu.Item onClick={() => visitModal(urlFor('create_agenda.render'))}>Nuevo veterinario</Menu.Item>
          </Menu>
        </ViewHeader>

        <div className="flex flex-col pb-20">
          <div className="flex flex-col">
            <div className="flex justify-between gap-3 p-4 mb-4 rounded-xl bg-white border">
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={() => onChangeDate(today())}>
                  Esta semana
                </Button>

                <CalendarDatePicker date={date} view="week" numberOfMonths={1} onDateChange={onChangeDate} />
              </div>
            </div>

            <ShiftTable agendas={agendas} {...table} />
          </div>
        </div>
      </div>
    </div>
  )
}
