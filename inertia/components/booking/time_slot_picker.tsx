import { DateTime } from 'luxon'
import { cn } from 'tailwind-variants'
import { useQuery } from '@tanstack/react-query'
import { useState, useMemo, useCallback } from 'react'
import { availableSlotsQueryOptions, monthAvailabilityQueryOptions } from '~/lib/queries'
import { DEFAULT_TIMEZONE, today } from '~/lib/date'
import { DatePicker } from '../ui/date_picker'
import { Skeleton } from '../ui/skeleton'
import { Card } from '../ui/card'

interface TimeSlotPickerProps {
  tenantId: string
  value?: string
  startDate?: string
  onValueChange?: (value: string) => void
  onDateChange?: (date: string) => void
}

export function TimeSlotPicker({
  tenantId,
  value,
  startDate = today().toFormat('yyyy-MM-dd'),
  onValueChange,
  onDateChange,
}: TimeSlotPickerProps) {
  const [internalDate, setInternalDate] = useState(() =>
    DateTime.fromISO(startDate, { zone: DEFAULT_TIMEZONE }).startOf('day')
  )

  const selectedDate = internalDate
  const initialMonth = useMemo(() => internalDate.startOf('month'), [])

  const [visibleMonth, setVisibleMonth] = useState(() => selectedDate.startOf('month'))

  const minValue = useMemo(() => today().startOf('day'), [])
  const maxValue = useMemo(() => today().plus({ months: 3 }).endOf('day'), [])

  function handleDateChange(next: DateTime) {
    setInternalDate(next)
    onDateChange?.(next.toISO()!)
  }

  function handleMonthChange(month: DateTime) {
    setVisibleMonth(month.startOf('month'))
  }

  const { data: availabilityByDay } = useQuery({
    ...monthAvailabilityQueryOptions({ tenantId, date: visibleMonth.toFormat('yyyy-MM-dd') }),
    enabled: Boolean(tenantId),
  })

  const { data: slots } = useQuery({
    ...availableSlotsQueryOptions({ tenantId, date: selectedDate.toFormat('yyyy-MM-dd') }),

    enabled: Boolean(tenantId),
  })

  const isDateUnavailable = useCallback(
    (day: DateTime) => {
      if (day < minValue) return true

      if (!availabilityByDay?.days) return false

      return !availabilityByDay.days[day.toFormat('yyyy-MM-dd')]?.available
    },
    [availabilityByDay, minValue]
  )

  const availableSlots = slots?.slots ?? []

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3 overflow-hidden">
        <h3 className="font-semibold text-[19px]/6">Selecciona una fecha</h3>
        <Card size="lg" className="overscroll-auto">
          <DatePicker
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            minValue={minValue}
            maxValue={maxValue}
            initialMonth={initialMonth}
            isDateUnavailable={isDateUnavailable}
          />
        </Card>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-semibold text-[19px]/6">Escoge una hora</h3>
        <div className="grid grid-cols-3 gap-3">
          {availableSlots.length === 0 &&
            Array.from({ length: 50 }).map((_, index) => (
              <Skeleton key={index} className="h-12 bg-white border rounded-lg" />
            ))}
          {availableSlots.map((slot) => (
            <button
              key={slot.at}
              type="button"
              className={cn(
                'w-full flex items-center justify-center px-6 min-h-12 bg-white border rounded-lg hover:bg-background',
                value === slot.at && 'outline-2 -outline-offset-1 outline-accent'
              )}
              onClick={() => onValueChange?.(slot.at)}
            >
              <span className="font-medium text-base/6">{slot.time}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
