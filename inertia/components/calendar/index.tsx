import { CalendarMonthView } from './calendar_month_view'
import { CalendarDaysView } from './calendar_days_view'

interface CalendarViewProps {
  date: string
  view: 'day' | '3_day' | 'week' | 'month'
}

export function Calendar(props: CalendarViewProps) {
  const { date, view } = props

  return (
    <>
      <div className="flex-1 overflow-x-hidden overflow-y-scroll bg-white overscroll-none">
        {view !== 'month' && <CalendarDaysView date={date} view={view} />}
        {view === 'month' && <CalendarMonthView date={props.date} />}
      </div>
    </>
  )
}
