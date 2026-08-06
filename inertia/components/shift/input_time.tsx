import React from 'react'
import { NativeSelect } from '../ui/native_select'
import { generateTimeSlots } from '~/lib/date'

interface InputTimeProps {
  value?: string
  defaultValue?: string
  onChange?(value: string): void
}

export function InputTime(props: InputTimeProps) {
  const { value, defaultValue, onChange } = props
  return (
    <NativeSelect value={value} defaultValue={defaultValue} onChange={(e) => onChange?.(e.target.value)}>
      <TimeOptions />
    </NativeSelect>
  )
}

interface TimeOptionsProps {
  stepMinutes?: number
}

export const TimeOptions = React.memo(function TimeOptions({ stepMinutes = 5 }: TimeOptionsProps) {
  return (
    <>
      {generateTimeSlots(stepMinutes).map(({ label, value }) => {
        return (
          <NativeSelect.Option key={value} value={value}>
            {label}
          </NativeSelect.Option>
        )
      })}
    </>
  )
})
