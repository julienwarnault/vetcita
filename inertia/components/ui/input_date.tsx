import { DateTime } from 'luxon'
import { cn } from 'tailwind-variants'
import { CalendarIcon } from 'lucide-react'
import { ReactElement, useState } from 'react'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { DatePicker } from './date_picker'
import { Popover } from './popover'
import { baseInput } from './input'

interface InputDateRenderProps {
  value: string
  date?: DateTime
  label: string
  placeholder: string
  open: boolean
}

interface InputDateProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: string
  defaultValue?: string
  placeholder?: string
  locale?: string
  numberOfMonths?: number
  minValue?: DateTime
  maxValue?: DateTime
  isDateUnavailable?: (date: DateTime) => boolean
  onValueChange?: (value: string) => void
  render?: ReactElement | ((props: InputDateRenderProps) => ReactElement)
}

export function InputDate(props: InputDateProps) {
  const {
    value,
    defaultValue,
    placeholder = 'Selecciona una fecha',
    locale = DEFAULT_LOCALE,
    numberOfMonths = 1,
    minValue,
    maxValue,
    isDateUnavailable,
    onValueChange,
    render,
    className,
    disabled,
    ...inputProps
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')

  const selectedValue = value ?? internalValue
  const selectedDate = selectedValue ? DateTime.fromISO(selectedValue, { zone: DEFAULT_TIMEZONE }) : undefined
  const label = selectedDate?.isValid ? selectedDate.setLocale(locale).toFormat('d LLL yyyy') : placeholder

  const handleDayClick = (day: DateTime) => {
    const nextValue = day.toFormat('yyyy-MM-dd')

    if (value === undefined) {
      setInternalValue(nextValue)
    }

    onValueChange?.(nextValue)
    setIsOpen(false)
  }

  const trigger =
    typeof render === 'function'
      ? render({ value: selectedValue, date: selectedDate, label, placeholder, open: isOpen })
      : (render ?? (
          <button
            type="button"
            disabled={disabled}
            className={cn(
              baseInput(),
              'inline-flex items-center justify-between gap-3 text-left',
              !selectedDate?.isValid && 'text-muted',
              className
            )}
          >
            <span className="truncate">{label}</span>
            <CalendarIcon className="size-5 shrink-0 text-muted" />
          </button>
        ))

  return (
    <>
      <input {...inputProps} type="hidden" value={selectedValue} disabled={disabled} />
      <Popover open={isOpen} onOpenChange={setIsOpen} align="start" trigger={trigger} className="overflow-auto p-4">
        <DatePicker
          initialMonth={selectedDate?.isValid ? selectedDate.startOf('month') : undefined}
          numberOfMonths={numberOfMonths}
          selectedDays={selectedDate?.isValid ? selectedDate : undefined}
          locale={locale}
          minValue={minValue}
          maxValue={maxValue}
          isDateUnavailable={isDateUnavailable}
          onDayClick={handleDayClick}
        />
      </Popover>
    </>
  )
}
