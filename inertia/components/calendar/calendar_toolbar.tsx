import {
  AlignVerticalSpaceAroundIcon,
  CalendarPlusIcon,
  CalendarDaysIcon,
  Columns3Icon,
  Columns4Icon,
  RotateCwIcon,
} from 'lucide-react'
import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useModalStack } from '@inertiaui/modal-react'
import { CalendarAgendaSelector } from './calendar_agenda_selector'
import { CalendarDatePicker } from './calendar_date_picker'
import { ButtonGroup } from '~/components/ui/button_group'
import { Tooltip } from '~/components/ui/tooltip'
import { Button } from '~/components/ui/button'
import { Select } from '~/components/ui/select'
import { Menu } from '~/components/ui/menu'
import { ViewType } from '~/lib/calendar'
import { urlFor } from '~/lib/tuyau'
import { today } from '~/lib/date'

interface CalendarToolbarProps {
  date: string
  view: ViewType
  agendas: Data.Agendas.Agenda[]
  agendaIds?: string[]
}

export function CalendarToolbar(props: CalendarToolbarProps) {
  const { date, view, agendas, agendaIds } = props

  const { visitModal } = useModalStack()

  const [_, setCalendarView] = useLocalStorage<Record<string, any>>('calendar_view', {})

  function navigate(newDate: string, newView: ViewType, newAgendaIds?: string[]) {
    const qs: Record<string, any> = { date: newDate, view: newView }

    if (newAgendaIds !== undefined) {
      qs.agendaIds = newAgendaIds.join(',')
    }

    setCalendarView(qs)

    router.get(urlFor('show_calendar.render', {}, { qs }), {}, { preserveState: true })
  }

  function onChangeView(newView: ViewType) {
    navigate(date, newView, agendaIds)
  }

  function onChangeDate(newDate: DateTime) {
    navigate(newDate.toFormat('yyyy-MM-dd'), view, agendaIds)
  }

  function onResetView() {
    navigate(today().toFormat('yyyy-MM-dd'), 'day', agendaIds)
  }

  function onChangeAgendas(newAgendaIds: string[] | undefined) {
    navigate(date, view, newAgendaIds)
  }

  return (
    <div className="border-b bg-background p-4">
      <div className="flex min-h-9 justify-between">
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => onChangeDate(today())}>
            Hoy
          </Button>

          <CalendarDatePicker date={date} view={view} onDateChange={onChangeDate} />

          <CalendarAgendaSelector
            agendas={agendas}
            selectedAgendaIds={agendaIds}
            onChange={onChangeAgendas}
          />
        </div>

        <div className="flex items-center gap-2">
          <ButtonGroup>
            <Tooltip
              trigger={
                <Button onClick={onResetView} variant="secondary" size="icon-sm">
                  <RotateCwIcon />
                </Button>
              }
            >
              Restablecer vista
            </Tooltip>

            <Select
              trigger={<Button variant="secondary" />}
              value={view}
              onValueChange={(value) => onChangeView(value as ViewType)}
              items={[
                { label: 'Día', value: 'day', leftElement: <AlignVerticalSpaceAroundIcon /> },
                { label: '3 días', value: '3_day', leftElement: <Columns3Icon /> },
                { label: 'Semana', value: 'week', leftElement: <Columns4Icon /> },
                { label: 'Mes', value: 'month', leftElement: <CalendarDaysIcon /> },
              ]}
            />
          </ButtonGroup>

          <Menu
            trigger={
              <Button>
                Añadir <Menu.TriggerIcon />
              </Button>
            }
          >
            <Menu.Item
              onClick={() => {
                visitModal(urlFor('create_appointment.render'))
              }}
            >
              <CalendarPlusIcon />
              Cita
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  )
}
