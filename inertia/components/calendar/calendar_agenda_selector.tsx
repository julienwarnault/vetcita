import { useState } from 'react'
import { tv } from 'tailwind-variants'
import { Data } from '@generated/data'
import { CheckIcon } from 'lucide-react'
import { Checkbox, CheckboxGroup } from '@base-ui/react'
import { Popover } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { Avatar } from '~/components/ui/avatar'

const agendaSelector = tv({
  slots: {
    container: 'flex flex-col gap-1 min-w-64',
    item: 'mx-[-0.75rem] flex flex-1 items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer select-none hover:bg-background',
    checkbox:
      'flex items-center justify-center size-6 border rounded-sm bg-white data-checked:bg-accent data-checked:text-white data-checked:border-accent',
  },
})

interface CalendarAgendaSelectorProps {
  agendas: Data.Agendas.Agenda[]
  selectedAgendaIds?: string[]
  onChange: (agendaIds: string[] | undefined) => void
}

export function CalendarAgendaSelector(props: CalendarAgendaSelectorProps) {
  const { agendas, selectedAgendaIds = [], onChange } = props

  const classes = agendaSelector()
  const allAgendaIds = agendas.map((agenda) => agenda.id)

  const [open, setOpen] = useState(false)
  const [localSelection, setLocalSelection] = useState<string[]>(selectedAgendaIds)

  function getButtonLabel() {
    if (localSelection.length === 0 || localSelection.length === allAgendaIds.length) {
      return 'Todas las agendas'
    }

    if (localSelection.length === 1) {
      const selectedAgenda = agendas.find((agenda) => agenda.id === localSelection[0])
      return selectedAgenda?.fullName ?? 'Agendas'
    }

    return 'Varias agendas'
  }

  function handleValueChange(value: string[]) {
    setLocalSelection(value)

    if (value.length === 0) return

    if (value.length === allAgendaIds.length) {
      onChange(undefined)
    } else {
      onChange(value)
    }
  }

  return (
    <Popover
      trigger={
        <Button variant="secondary">
          {getButtonLabel()}
          <Popover.TriggerIcon />
        </Button>
      }
      align="start"
      open={open}
      onOpenChange={(value) => {
        if (value && localSelection.length === 0) {
          setLocalSelection(allAgendaIds)
        }
        setOpen(value)
      }}
      className="py-3"
    >
      <CheckboxGroup
        allValues={allAgendaIds}
        value={localSelection}
        onValueChange={handleValueChange}
        className={classes.container()}
      >
        <label className={classes.item()}>
          <Checkbox.Root parent className={classes.checkbox()}>
            <Checkbox.Indicator className="flex data-unchecked:hidden data-indeterminate:hidden">
              <CheckIcon size={14} strokeWidth={3} />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span className="text-[15px]/5 font-semibold">Todas las agendas</span>
        </label>

        {agendas.map((agenda) => (
          <label key={agenda.id} className={classes.item()}>
            <Checkbox.Root value={agenda.id} className={classes.checkbox()}>
              <Checkbox.Indicator className="flex data-unchecked:hidden">
                <CheckIcon size={14} strokeWidth={3} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <Avatar fullName={agenda.fullName} color={agenda.color} className="size-7 text-[11px]" />
            <span className="text-[15px]/5 font-medium">{agenda.fullName}</span>
          </label>
        ))}
      </CheckboxGroup>
    </Popover>
  )
}
