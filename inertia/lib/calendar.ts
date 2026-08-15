import { DateTime, type Interval } from 'luxon'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE, eachDayOfInterval, dayId } from './date'

export type Event = {
  id: string
  start: DateTime
  end: DateTime
  duration: number
  client: {
    fullName: string
    phone: string
    email?: string
  }
  pet: {
    name: string
    illustrationUrl: string
  }
  agenda: {
    fullName: string
    color: string
  }
  status: {
    name: string
    icon: string
    color: string
    isDefault: boolean
  }
  typeName: string
  color: string
  bookingRef: string
}

export type EventSlot = {
  index: number
  columns: number
  intersects: string[]
  isLast: boolean
}

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

export function mapEvents(events: Event[]): Map<string, Event[]> {
  const map = new Map<string, Event[]>()

  for (const event of events) {
    const id = dayId(event.start)
    map.set(id, [...(map.get(id) ?? []), event])
  }

  return map
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

  return formatter.formatRange(range.start!.toJSDate(), range.end!.toJSDate()).replaceAll(' de ', ' ').replace('–', '-')
}

export function buildDaySlots(events: Event[]) {
  const sorted = [...events].map((event) => ({
    id: event.id,
    start: event.start.toJSDate().getTime(),
    end: event.end.toJSDate().getTime(),
  }))

  const result: Map<string, EventSlot> = new Map()
  let active: { id: string; index: number; start: any; end: any }[] = []
  let cluster: { id: string; index: number; start: any; end: any }[] = []

  const finalizeCluster = () => {
    if (!cluster.length) return

    const columns = Math.max(...cluster.map((e) => e.index)) + 1

    for (const item of cluster) {
      const intersects = cluster
        .filter((o) => o.id !== item.id && o.start < item.end && o.end > item.start)
        .map((o) => o.id)

      const isLast =
        cluster
          .filter((o) => o.index === item.index)
          .sort((a, b) => a.start - b.start)
          .at(-1)?.id === item.id

      result.set(item.id, { index: item.index, columns, intersects, isLast })
    }

    cluster = []
  }

  for (const event of sorted) {
    active = active.filter((e) => e.end > event.start)

    if (!active.length) finalizeCluster()

    const used = new Set(active.map((e) => e.index))
    let index = 0
    while (used.has(index)) index++

    const entry = { ...event, index }
    active.push(entry)
    cluster.push(entry)
  }

  finalizeCluster()

  return result
}
