import { DateTime, type Interval } from 'luxon'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE, eachDayOfInterval } from './date'

export const SLOT_IN_MINUTES = 15
export const SLOT_HEIGHT = 24

export type ViewType = 'day' | '3_day' | 'week' | 'month'

const formatter = new Intl.DateTimeFormat(DEFAULT_LOCALE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function getMonthDays(date: string) {
  const dt = DateTime.fromISO(date, { zone: DEFAULT_TIMEZONE })
  const montStartAt = dt.startOf('month')
  const start = montStartAt.startOf('week')
  const end = montStartAt.endOf('month').endOf('week')
  return eachDayOfInterval({ start, end })
}

export function getDaysFromView(date: string, view: ViewType): DateTime[] {
  const dt = DateTime.fromISO(date, { zone: DEFAULT_TIMEZONE }).setLocale(DEFAULT_LOCALE)

  switch (view) {
    case 'day':
      return [dt]
    case '3_day':
      return eachDayOfInterval({ start: dt, end: dt.plus({ days: 2 }) })
    case 'week':
      return eachDayOfInterval({ start: dt.startOf('week'), end: dt.endOf('week') })
  }

  return []
}

export function getRatio() {
  return SLOT_HEIGHT / SLOT_IN_MINUTES
}

export function getRangeForView(date: string, view: ViewType) {
  const dt = DateTime.fromISO(date, { zone: DEFAULT_TIMEZONE })

  switch (view) {
    case 'day':
      return { start: dt.startOf('day'), end: dt.endOf('day') }
    case '3_day':
      return { start: dt.startOf('day'), end: dt.plus({ days: 2 }).endOf('day') }
    case 'week':
      return { start: dt.startOf('week'), end: dt.endOf('week') }
    case 'month':
    default:
      return { start: dt.startOf('month'), end: dt.endOf('month') }
  }
}

export function formatDisplayedRange(range: Interval, view: ViewType) {
  if (view === 'month') {
    return range.start!.setLocale(DEFAULT_LOCALE).toFormat('LLL yyyy')
  }

  return formatter
    .formatRange(range.start!.toJSDate(), range.end!.toJSDate())
    .replaceAll(' de ', ' ')
    .replace('–', '-')
}
