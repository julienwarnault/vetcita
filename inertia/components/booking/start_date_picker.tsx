import { cn } from 'tailwind-variants'
import { DateTime, Interval } from 'luxon'
import { useIsFirstRender } from '@uidotdev/usehooks'
import { CalendarIcon, CircleCheckIcon } from 'lucide-react'
import { useQuery, useQueries } from '@tanstack/react-query'
import { UIEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE, eachDayOfInterval, today } from '~/lib/date'
import { bookableDaysQueryOptions, bookableSlotsQueryOptions } from '~/lib/queries'
import { Skeleton } from '../ui/skeleton'
import { range } from '~/lib/utils'

const GROUP_SIZE = 7

function getGroupIndex(date: DateTime, origin: DateTime): number {
  return Math.floor(date.diff(origin, 'days').days / GROUP_SIZE)
}

function getGroupInterval(groupIndex: number, origin: DateTime): Interval {
  const start = origin.plus({ days: groupIndex * GROUP_SIZE })
  const end = start.plus({ days: GROUP_SIZE - 1 }).endOf('day')
  return Interval.fromDateTimes(start, end)
}

interface StartDatePickerProps {
  tenantId: string
  appointmentTypeId: string
  value?: string
  startDate?: string
  maxDays?: number
  onValueChange?: (start: string, agendaId: string) => void
}

export function StartDatePicker(props: StartDatePickerProps) {
  const {
    tenantId,
    appointmentTypeId,
    value,
    startDate = today().toFormat('yyyy-MM-dd'),
    maxDays = 90,
    onValueChange,
  } = props

  const activeDayRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useIsFirstRender()

  const minValue = useMemo(() => today().startOf('day'), [])
  const maxValue = useMemo(() => today().plus({ days: maxDays }).endOf('day'), [])
  const days = useMemo(
    () => eachDayOfInterval({ start: minValue, end: maxValue }),
    [minValue, maxValue]
  )

  const [internalDate, setInternalDate] = useState(() =>
    DateTime.fromISO(startDate, { zone: DEFAULT_TIMEZONE }).startOf('day')
  )

  const [visitedGroups, setVisitedGroups] = useState<Set<number>>(() => {
    const initialGroup = getGroupIndex(
      DateTime.fromISO(startDate, { zone: DEFAULT_TIMEZONE }),
      minValue
    )
    return new Set([...range(Math.max(0, initialGroup - 1), initialGroup + 1)])
  })

  useEffect(() => {
    activeDayRef.current?.scrollIntoView({
      behavior: isFirstRender ? 'instant' : 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }, [isFirstRender, internalDate])

  const handleScrollEnd = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      const scrollWidth = e.currentTarget.scrollWidth
      const clientWidth = e.currentTarget.clientWidth
      const scrollLeft = Math.abs(e.currentTarget.scrollLeft)
      const dayWidth = scrollWidth / days.length
      const firstVisibleIndex = Math.round(scrollLeft / dayWidth)
      const lastVisibleIndex = Math.floor((scrollLeft + clientWidth - dayWidth) / dayWidth)

      const firstVisibleDate = days[Math.max(0, firstVisibleIndex)]
      const lastVisibleDate = days[Math.min(days.length - 1, lastVisibleIndex)]

      const firstGroup = getGroupIndex(firstVisibleDate, minValue)
      const lastGroup = getGroupIndex(lastVisibleDate, minValue)

      const newGroups = range(firstGroup, lastGroup + 1)

      setVisitedGroups((prev) => {
        const hasNew = newGroups.some((g) => !prev.has(g))
        if (!hasNew) return prev
        return new Set([...prev, ...newGroups])
      })
    },
    [days, minValue]
  )

  const mergedDates = useQueries({
    queries: [...visitedGroups].map((groupIndex) => {
      const interval = getGroupInterval(groupIndex, minValue)
      return {
        ...bookableDaysQueryOptions({
          tenantId,
          appointmentTypeId,
          from: interval.start!.toFormat('yyyy-MM-dd'),
          to: interval.end!.toFormat('yyyy-MM-dd'),
        }),
        enabled: Boolean(tenantId && appointmentTypeId),
        staleTime: Infinity,
      }
    }),
    combine: (results) =>
      results.reduce(
        (acc, result) => ({ ...acc, ...result.data?.days }),
        {} as Record<string, { available: boolean }>
      ),
  })

  const isDateAvailable = mergedDates[internalDate.toFormat('yyyy-MM-dd')]?.available ?? false

  const { data: slots, isLoading } = useQuery({
    ...bookableSlotsQueryOptions({
      tenantId,
      appointmentTypeId,
      date: internalDate.toFormat('yyyy-MM-dd'),
    }),
    enabled: Boolean(tenantId && appointmentTypeId && isDateAvailable),
  })

  const availableSlots = slots?.slots ?? []

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 overflow-hidden">
        <h3 className="font-semibold text-[19px]/6">Selecciona una fecha</h3>
        <div
          className="flex overflow-scroll overscroll-x-contain block-auto inline-full scrollbar-none scroll-p-[unset] snap-x snap-mandatory scroll-smooth"
          onScrollEnd={handleScrollEnd}
        >
          <div className="inline-flex flex-end block-auto">
            {days.map((day) => {
              const key = day.toFormat('yyyy-MM-dd')

              const localDay = day.setLocale(DEFAULT_LOCALE)

              const isAvailable = mergedDates[key]?.available ?? false
              const isSelected = day.hasSame(internalDate, 'day')

              return (
                <div
                  key={key}
                  ref={isSelected ? activeDayRef : undefined}
                  className="snap-start not-last:pr-4"
                >
                  <button
                    type="button"
                    disabled={!isAvailable}
                    className={cn(
                      'flex flex-col items-center justify-center bg-white border rounded-2xl py-3 inline-16',
                      isSelected
                        ? 'bg-accent text-white'
                        : 'hover:bg-background [&_span]:text-muted',
                      !isAvailable && 'opacity-30'
                    )}
                    onClick={() => setInternalDate(day)}
                  >
                    <span className="font-medium text-sm/5">{localDay.toFormat('ccc')}</span>
                    <div className="font-semibold text-2xl/8">{localDay.toFormat('d')}</div>
                    <span className="font-normal text-[13px]/4">{localDay.toFormat('MMM')}</span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {(isLoading || availableSlots.length > 0) && (
        <div className="flex flex-col gap-3">
          <div>
            <div className="font-semibold text-[19px]/6">Escoge una hora</div>
          </div>
          <div className="flex flex-col gap-3">
            {isLoading &&
              Array.from({ length: 12 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="flex items-center py-5 px-6 h-16.5 bg-white border rounded-2xl"
                >
                  <div className="bg-border h-2 rounded-full w-12" />
                </Skeleton>
              ))}

            {availableSlots.map((slot) => (
              <button
                key={slot.at}
                type="button"
                className={cn(
                  'w-full flex items-center justify-between py-5 px-6 min-h-16.5 bg-white border rounded-2xl hover:bg-background',
                  value === slot.at && 'text-accent outline-2 -outline-offset-1 outline-accent'
                )}
                onClick={() => onValueChange?.(slot.at, slot.agendaId)}
              >
                <div className="font-medium text-base/6">{slot.time}</div>
                {value === slot.at && <CircleCheckIcon className="text-accent" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isLoading && availableSlots.length == 0 && (
        <div className="flex flex-col items-center justify-center gap-4 py-16 px-6">
          <CalendarIcon size={56} strokeWidth={1.5} className="text-accent" />
          <div className="font-semibold text-[19px]/6">Sin citas disponibles para esta fecha</div>
        </div>
      )}
    </div>
  )
}
