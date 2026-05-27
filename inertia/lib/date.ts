import { DateTime, Interval } from 'luxon'

export const DEFAULT_TIMEZONE = 'America/Mexico_City'
export const DEFAULT_LOCALE = 'es-MX'

export function dayId(date: DateTime): string {
  return date.toFormat('yyyy-MM-dd')
}

export function today() {
  return DateTime.now().setZone(DEFAULT_TIMEZONE)
}

export function isPastDate(date: DateTime) {
  return date.startOf('day') < DateTime.now().startOf('day')
}

export function isToday(date: DateTime) {
  const now = DateTime.now()
  return date.hasSame(now, 'day')
}

export function getMinutesInDay(date: DateTime) {
  return date.hour * 60 + date.minute
}

export function eachDayOfInterval({ start, end }: { start: DateTime; end: DateTime }) {
  const days = []
  let cursor = start.startOf('day')
  const last = end.startOf('day')

  while (cursor <= last) {
    days.push(cursor)
    cursor = cursor.plus({ days: 1 })
  }

  return days
}

export function toInterval(value: Interval | DateTime | undefined): Interval | undefined {
  if (!value) return undefined

  if (value instanceof DateTime) {
    return Interval.fromDateTimes(value.startOf('day'), value.endOf('day'))
  }

  return value
}
