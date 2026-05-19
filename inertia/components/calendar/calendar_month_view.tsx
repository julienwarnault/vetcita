import { Info } from 'luxon'
import { CalendarDayCell } from './calendar_day_cell'
import { getMonthDays } from '~/lib/calendar'
import { DEFAULT_LOCALE } from '~/lib/date'
import { capitalize } from '~/lib/utils'

interface CalendarMonthViewProps {
  date: string
}

export function CalendarMonthView(props: CalendarMonthViewProps) {
  const { date } = props

  const days = getMonthDays(date)

  const weekdays = Info.weekdays('long', { locale: DEFAULT_LOCALE })

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-10 grid grid-cols-7 bg-surface shadow-sm">
        {weekdays.map((day, index) => (
          <div key={index} className="p-3">
            <span className="text-[15px] font-medium leading-5">{capitalize(day)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <CalendarDayCell key={index} day={day} />
        ))}
      </div>
    </div>
  )
}
