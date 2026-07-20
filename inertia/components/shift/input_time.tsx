import React from 'react'
import { DateTime } from 'luxon'
import { NativeSelect } from '../ui/native_select'

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
  const count = (24 * 60) / stepMinutes

  return (
    <>
      {[...Array(count)].map((_, k) => {
        const dt = DateTime.fromObject({ hour: 0, minute: 0 }).plus({ minutes: k * stepMinutes })
        const value = dt.toFormat('HH:mm:00')
        return (
          <NativeSelect.Option key={value} value={value}>
            {dt.toFormat('hh:mma').toLowerCase()}
          </NativeSelect.Option>
        )
      })}
    </>
  )
})
