import { useMemo, useState } from 'react'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { DEFAULT_SHIFT, getNextShift } from '~/lib/scheduling'
import { Checkbox } from '../ui/checkbox'
import { getWeekdays } from '~/lib/date'
import { InputTime } from './input_time'
import { Button } from '../ui/button'
import { Field } from '../ui/field'

type Shift = { startTime: string; endTime: string }

interface InputWorkingHoursProps {
  name: string
  value: Shift[][]
  onChange(value: Shift[][]): void
  emptyLabel?: string
}

export function InputWorkingHours(props: InputWorkingHoursProps) {
  const { name, value, onChange, emptyLabel = 'No está trabajando' } = props

  const weekdays = useMemo(() => getWeekdays(), [])
  const [lastEditedDay, setLastEditedDay] = useState<number | null>(null)

  function updateShiftTime(i: number, j: number, k: 'startTime' | 'endTime', newValue: string) {
    const data = [...value]
    data[i][j][k] = newValue
    onChange(data)
    setLastEditedDay(i)
  }

  function toggleDay(i: number, checked: boolean) {
    const data = [...value]
    data[i] = checked ? [...data[i], DEFAULT_SHIFT] : []
    onChange(data)
  }

  function addShift(i: number) {
    const data = [...value]
    const day = data[i]
    const lastEnd = day[day.length - 1].endTime
    data[i] = [...day, getNextShift(lastEnd)]
    onChange(data)
  }

  function removeShift(i: number, j: number) {
    const data = [...value]
    data[i] = data[i].filter((_, index) => index !== j)
    onChange(data)
  }

  function copyDays(i: number) {
    const source = value[i]
    const data = value.map((day, index) => (index === i || day.length === 0 ? day : [...source]))
    onChange(data)
    setLastEditedDay(null)
  }

  return (
    <div className="flex flex-col gap-y-7">
      {weekdays.map((day, i) => {
        const shifts = value[i]
        const canCopy = shifts.length > 0 && lastEditedDay === i

        return (
          <div key={i} className="grid grid-cols-12 gap-x-4">
            <div className="flex gap-3 col-span-3 pt-1.5">
              <Checkbox
                defaultChecked={false}
                checked={shifts.length > 0}
                onCheckedChange={(checked) => toggleDay(i, checked)}
              />
              <div className="flex flex-col">
                <div className="text-[15px]/5 lowercase">{day}</div>
              </div>
            </div>

            {shifts.length > 0 && (
              <div className="flex flex-col gap-x-1 gap-y-3 col-span-9">
                {shifts.map((_, j) => {
                  return (
                    <div key={`${i}.${j}`} className="flex gap-1.5">
                      <div className="flex-1 grid grid-cols-11 gap-2">
                        <div className="col-span-5">
                          <Field name={`${name}.${i}.${j}.startTime`}>
                            <InputTime
                              value={shifts[j].startTime}
                              onChange={(time) => updateShiftTime(i, j, 'startTime', time)}
                            />
                            <Field.Error />
                          </Field>
                        </div>

                        <div className="text-center pt-3.5">
                          <div className="text-muted text-[15px]/5">a</div>
                        </div>

                        <div className="col-span-5">
                          <Field name={`${name}.${i}.${j}.endTime`}>
                            <InputTime
                              value={shifts[j].endTime}
                              onChange={(time) => updateShiftTime(i, j, 'endTime', time)}
                            />
                            <Field.Error />
                          </Field>
                        </div>
                      </div>

                      <div className="flex pt-2">
                        <Button
                          size="icon-sm"
                          rounded="full"
                          variant="tertiary"
                          disabled={j !== shifts.length - 1}
                          onClick={() => addShift(i)}
                        >
                          <PlusCircleIcon />
                        </Button>
                        <Button
                          size="icon-sm"
                          rounded="full"
                          variant="tertiary"
                          className="text-destructive"
                          onClick={() => removeShift(i, j)}
                        >
                          <Trash2Icon />
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {canCopy && (
                  <div className="flex gap-2 items-center justify-between py-3 px-3 border bg-background text-[15px]/5 rounded-xl">
                    ¿Quieres copiar este horario a todos los días disponibles?
                    <Button variant="secondary" onClick={() => copyDays(i)}>
                      Copiar
                    </Button>
                  </div>
                )}
              </div>
            )}

            {shifts.length === 0 && <div className="col-span-9 text-[15px]/5 text-muted my-auto">{emptyLabel}</div>}
          </div>
        )
      })}
    </div>
  )
}
