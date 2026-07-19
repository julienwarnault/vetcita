import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useForm } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import React, { SubmitEvent, useEffect, useMemo, useState } from 'react'
import { timeToMinutes, sum, formatDuration } from '~/lib/utils'
import { NativeSelect } from '~/components/ui/native_select'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import { Checkbox } from '~/components/ui/checkbox'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import MinimalLayout from '~/layouts/minimal'
import { getWeekdays } from '~/lib/date'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  agenda: Data.Agendas.Agenda
  workingHours: Data.Scheduling.WorkingHour[]
}>

function getNextShift(lastEnd: string): [string, string] {
  const parsedEnd = DateTime.fromFormat(lastEnd, 'HH:mm:ss')
  const cap = DateTime.fromFormat('22:00:00', 'HH:mm:ss')
  const max = DateTime.fromFormat('23:55:00', 'HH:mm:ss')

  const base = DateTime.min(parsedEnd, cap)

  const start = DateTime.min(base.plus({ hours: 1 }), max)
  const end = DateTime.min(base.plus({ hours: 2 }), max)

  return [start.toFormat('HH:mm:ss'), end.toFormat('HH:mm:ss')]
}

export default function ShowForm(props: PageProps) {
  const { agenda, workingHours } = props

  const title = 'Turnos recurrentes de ' + agenda.name

  const form = useForm({
    weekShifts: [...Array(7)].map((_, i) => [
      ...workingHours.filter((wh) => wh.dayOfWeek === i + 1).map(({ startTime, endTime }) => [startTime, endTime]),
    ]),
  })

  const [lastEditedDay, setLastEditedDay] = useState<number | null>(null)

  useEffect(() => {
    const errors: { [field: string]: string } = {}

    form.data.weekShifts.forEach((weekShift, i) => {
      for (let j = 0; j < weekShift.length; j++) {
        const [start, end] = weekShift[j]

        if (j > 0) {
          const [, previousEnd] = weekShift[j - 1]

          if (previousEnd > start) {
            errors[`weekShifts.${i}.${j - 1}.1`] = 'El turno coincide con otro'
            errors[`weekShifts.${i}.${j}.0`] = 'El turno coincide con otro'
          }
        }

        if (start > end) {
          errors[`weekShifts.${i}.${j}.1`] = 'La hora de finalización debe ser posterior a la hora de inicio'
        }
      }
    })

    form.clearErrors()
    if (Object.keys(errors).length > 0) form.setError(errors)
  }, [form.data.weekShifts])

  function getTotalHours(): number {
    return sum(
      form.data.weekShifts.map((shifts) =>
        sum(shifts.map((s) => Math.max(0, timeToMinutes(s[1]) - timeToMinutes(s[0]))))
      )
    )
  }

  function updateShiftTime(i: number, j: number, k: 0 | 1, value: string) {
    const data = form.data.weekShifts.map((day) => day.map((shift) => [...shift] as [string, string]))
    data[i][j][k] = value
    form.setData('weekShifts', data)
    setLastEditedDay(i)
  }

  function toggleDay(i: number, checked: boolean) {
    const data = [...form.data.weekShifts]
    data[i] = checked ? [...data[i], ['08:00:00', '19:00:00']] : []
    form.setData('weekShifts', data)
  }

  function addShift(i: number) {
    const data = [...form.data.weekShifts]
    const day = data[i]
    const lastEnd = day[day.length - 1][1]
    data[i] = [...day, getNextShift(lastEnd)]
    form.setData('weekShifts', data)
  }

  function removeShift(i: number, j: number) {
    const data = [...form.data.weekShifts]
    data[i] = data[i].filter((_, index) => index !== j)
    form.setData('weekShifts', data)
  }

  function copyDays(i: number) {
    const source = form.data.weekShifts[i]
    const data = form.data.weekShifts.map((day, index) =>
      index === i || day.length === 0 ? day : source.map((shift) => [...shift] as [string, string])
    )
    form.setData('weekShifts', data)
    setLastEditedDay(null)
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (form.hasErrors) return

    form.put(urlFor('update_working_hours.execute', { agendaId: agenda.id }))
  }

  const weekdays = useMemo(() => getWeekdays(), [])

  return (
    <>
      <FormHeader
        title={title}
        rightElement={
          <>
            <ButtonLink size="lg" variant="secondary" route="list_shifts.render">
              Cerrar
            </ButtonLink>
            <Button type="submit" size="lg" form="form" disabled={form.processing}>
              Guardar
            </Button>
          </>
        }
      />

      <div className="container">
        <div className="pt-9 pb-8">
          <h1 className="text-[40px]/11 font-bold mb-3">{title}</h1>
          <div className="text-[17px]/6 text-muted">Establece turnos semanales.</div>
        </div>

        <Form id="form" onSubmit={handleSubmit} className="gap-16 pb-24" errors={form.errors}>
          <div className="flex flex-col">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <div className="text-[20px]/7 font-semibold">Semanal</div>
                <div className="text-muted text-[15px]/5">{formatDuration(getTotalHours())} en total</div>
              </div>
              <div className="flex flex-col gap-y-7">
                {weekdays.map((day, i) => {
                  const shifts = form.data.weekShifts[i]
                  const duration = sum(shifts.map((s) => Math.max(0, timeToMinutes(s[1]) - timeToMinutes(s[0]))))
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
                          {shifts.length > 0 && (
                            <div className="font-normal text-[13px]/4 text-muted">{formatDuration(duration)}</div>
                          )}
                        </div>
                      </div>
                      {shifts.length > 0 && (
                        <div className="flex flex-col gap-x-1 gap-y-3 col-span-9">
                          {shifts.map((_, j) => {
                            return (
                              <div key={`${i}.${j}`} className="flex gap-1.5">
                                <div className="flex-1 grid grid-cols-11 gap-2">
                                  <div className="col-span-5">
                                    <Field name={`weekShifts.${i}.${j}.0`}>
                                      <NativeSelect
                                        value={shifts[j][0]}
                                        onChange={(e) => updateShiftTime(i, j, 0, e.target.value)}
                                      >
                                        <TimeOptions />
                                      </NativeSelect>
                                      <Field.Error />
                                    </Field>
                                  </div>
                                  <div className="text-center pt-3.5">
                                    <div className="text-muted text-[15px]/5">a</div>
                                  </div>
                                  <div className="col-span-5">
                                    <Field name={`weekShifts.${i}.${j}.1`}>
                                      <NativeSelect
                                        value={shifts[j][1]}
                                        onChange={(e) => updateShiftTime(i, j, 1, e.target.value)}
                                      >
                                        <TimeOptions />
                                      </NativeSelect>
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
                      {shifts.length === 0 && (
                        <div className="col-span-9 text-[15px]/5 text-muted my-auto">No está trabajando</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
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

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
