import { DateTime, Info, Interval } from 'luxon'
import { CSSProperties, useMemo, useState } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { DEFAULT_LOCALE, today } from '~/lib/date'
import { getMonthDays } from '~/lib/calendar'
import { capitalize } from '~/lib/utils'

const datePicker = tv({
  slots: {
    container: 'relative min-h-94 min-w-[calc(7*var(--months)*44px)]',
    navigation: 'pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between',
    navigationButton:
      'pointer-events-auto flex size-10 items-center justify-center rounded-full hover:bg-background focus-visible:ring-2 focus-visible:ring-accent',
    monthList: 'flex flex-row gap-8',
    monthPanel: 'flex grow flex-col gap-1',
    monthTitle: 'flex h-10 items-center justify-center text-base font-semibold',
    weekdayRow: 'grid grid-cols-7 gap-1',
    weekdayCell: 'flex h-11 items-center justify-center',
    weekdayText: 'text-[15px] no-underline text-foreground',
    dayGrid: 'grid grid-cols-7 gap-1',
    dayButton: 'relative flex size-11 items-center justify-center rounded-full',
    rangeFill: 'absolute inset-y-0 w-[calc(50%+2px)] bg-accent-faded',
    dayContent:
      'relative z-10 flex size-11 items-center justify-center rounded-full border border-transparent',
    dayText: 'font-medium text-[15px]',
  },
  variants: {
    visible: {
      true: { dayButton: 'hover:bg-background focus-visible:ring-2 focus-visible:ring-accent' },
      false: { dayButton: 'invisible cursor-default' },
    },
    state: {
      default: {},
      today: { dayContent: 'border-border' },
      selected: { dayContent: 'bg-accent text-white' },
    },
    side: {
      left: { rangeFill: '-left-0.5' },
      right: { rangeFill: '-right-0.5' },
    },
  },
})

type DayState = NonNullable<VariantProps<typeof datePicker>['state']>

interface DatePickerProps {
  initialMonth?: DateTime
  numberOfMonths?: number
  selectedDays?: Interval
  locale?: string
  onDayClick?: (day: DateTime) => void
}

export function DatePicker(props: DatePickerProps) {
  const {
    initialMonth,
    numberOfMonths = 1,
    selectedDays,
    locale = DEFAULT_LOCALE,
    onDayClick,
  } = props

  const styles = datePicker()

  const [currentMonth, setCurrentMonth] = useState(() => (initialMonth ?? today()).startOf('month'))

  const todayDate = useMemo(() => today(), [])

  const start = selectedDays?.start ?? undefined
  const end = selectedDays?.end ?? undefined

  const weekdays = Info.weekdays('short', { locale: DEFAULT_LOCALE })

  return (
    <div
      role="group"
      className={styles.container()}
      style={{ '--months': numberOfMonths } as CSSProperties}
    >
      <div className={styles.navigation()}>
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => m.minus({ months: 1 }))}
          className={styles.navigationButton()}
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => setCurrentMonth((m) => m.plus({ months: 1 }))}
          className={styles.navigationButton()}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className={styles.monthList()}>
        {Array.from({ length: numberOfMonths }, (_, i) => {
          const month = currentMonth.plus({ months: i })
          const days = getMonthDays(month.toFormat('yyyy-MM-dd'))

          return (
            <div key={i} className={styles.monthPanel()}>
              <h2 className={styles.monthTitle()}>
                {capitalize(month.setLocale(locale).toFormat('LLLL yyyy'))}
              </h2>

              <div role="row" className={styles.weekdayRow()}>
                {weekdays.map((day, j) => (
                  <div key={j} role="columnheader" className={styles.weekdayCell()}>
                    <abbr title={day} className={styles.weekdayText()}>
                      {capitalize(day)}
                    </abbr>
                  </div>
                ))}
              </div>

              <div role="grid" className={styles.dayGrid()}>
                {days.map((day) => {
                  const inMonth = day.month === month.month
                  const isToday = day.hasSame(todayDate, 'day')
                  const isFrom = !!start?.hasSame(day, 'day')
                  const isTo = !!end?.hasSame(day, 'day')
                  const isSelected = isFrom || isTo
                  const isInRange = isFrom || isTo || !!selectedDays?.contains(day)

                  const dayState: DayState = isSelected ? 'selected' : isToday ? 'today' : 'default'

                  const showLeftBar = isInRange && !isFrom
                  const showRightBar = isInRange && !isTo

                  return (
                    <button
                      key={day.toISODate()}
                      type="button"
                      role="gridcell"
                      disabled={!inMonth}
                      onClick={() => onDayClick?.(day)}
                      className={styles.dayButton({ visible: inMonth })}
                    >
                      {showLeftBar && <span className={styles.rangeFill({ side: 'left' })} />}
                      {showRightBar && <span className={styles.rangeFill({ side: 'right' })} />}
                      <span className={styles.dayContent({ state: dayState })}>
                        <span className={styles.dayText()}>{day.toFormat('d')}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
