import { useState } from 'react'
import { DateTime, Interval } from 'luxon'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { formatDisplayedRange, getRangeForView, type ViewType } from '~/lib/calendar'
import { ButtonGroup } from '~/components/ui/button_group'
import { DatePicker } from '~/components/ui/date_picker'
import { Popover } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'

interface CalendarDatePickerProps {
  date: string
  view: ViewType
  numberOfMonths?: number
  onDateChange: (date: DateTime) => void
}

export function CalendarDatePicker(props: CalendarDatePickerProps) {
  const { date, view, numberOfMonths = 2, onDateChange } = props

  const { start, end } = getRangeForView(date, view)
  const selectedDays = Interval.fromDateTimes(start, end)

  const [isOpen, setIsOpen] = useState(false)

  const onNavigate = (direction: 1 | -1) => {
    const dt = DateTime.fromISO(date)

    switch (view) {
      case 'day':
        return onDateChange(dt.plus({ days: direction }))
      case '3_day':
        return onDateChange(dt.plus({ days: direction * 3 }))
      case 'week':
        return onDateChange(dt.plus({ weeks: direction }))
      case 'month':
      default:
        return onDateChange(dt.plus({ months: direction }))
    }
  }

  return (
    <ButtonGroup>
      <Button variant="secondary" size="icon-sm" onClick={() => onNavigate(-1)}>
        <ChevronLeftIcon size={18} />
      </Button>

      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        alignOffset={-35}
        trigger={
          <Button variant="secondary" className="min-w-44 max-w-44 truncate">
            {formatDisplayedRange(selectedDays, view)}
          </Button>
        }
      >
        <div className="p-4">
          <DatePicker
            initialMonth={start.startOf('month')}
            numberOfMonths={numberOfMonths}
            selectedDays={selectedDays}
            onDayClick={(newDay) => {
              onDateChange(newDay)
              setIsOpen(false)
            }}
          />
        </div>
      </Popover>

      <Button variant="secondary" size="icon-sm" onClick={() => onNavigate(1)}>
        <ChevronRightIcon size={18} />
      </Button>
    </ButtonGroup>
  )
}
