import { CalendarToolbar } from '~/components/calendar/calendar_toolbar'
import { Calendar } from '~/components/calendar'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  date: string
  view: 'day' | '3_day' | 'week' | 'month'
}>

export default function ShowCalendar(props: PageProps) {
  const { date, view } = props

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <CalendarToolbar date={date} view={view} />

      <div className="flex flex-1 overflow-hidden">
        <Calendar date={date} view={view} />
      </div>
    </div>
  )
}
