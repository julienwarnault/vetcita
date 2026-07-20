import { Data } from '@generated/data'
import { useForm } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { ReactElement, SubmitEvent, useEffect, useMemo, useRef, useState } from 'react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { timeToMinutes, sum, formatDuration } from '~/lib/utils'
import { DEFAULT_SHIFT, getNextShift } from '~/lib/scheduling'
import { InputTime } from '~/components/shift/input_time'
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

export default function WorkingHoursForm(props: PageProps) {
  const { agenda, workingHours } = props

  const modalRef = useRef<InertiaModalRef>(null)

  const title = 'Turnos recurrentes de ' + agenda.name

  const form = useForm({
    weekShifts: [...Array(7)].map((_, i) => [
      ...workingHours.filter((wh) => wh.dayOfWeek === i + 1).map(({ startTime, endTime }) => ({ startTime, endTime })),
    ]),
  })

  const [lastEditedDay, setLastEditedDay] = useState<number | null>(null)

  useEffect(() => {
    const errors: { [field: string]: string } = {}

    form.data.weekShifts.forEach((weekShift, i) => {
      for (let j = 0; j < weekShift.length; j++) {
        const { startTime: start, endTime: end } = weekShift[j]

        if (j > 0) {
          const { endTime: previousEnd } = weekShift[j - 1]

          if (previousEnd > start) {
            errors[`weekShifts.${i}.${j - 1}.endTime`] = 'El turno coincide con otro'
            errors[`weekShifts.${i}.${j}.startTime`] = 'El turno coincide con otro'
          }
        }

        if (start > end) {
          errors[`weekShifts.${i}.${j}.endTime`] = 'La hora de finalización debe ser posterior a la hora de inicio'
        }
      }
    })

    form.clearErrors()
    if (Object.keys(errors).length > 0) form.setError(errors)
  }, [form.data.weekShifts])

  function getTotalHours(): number {
    return sum(
      form.data.weekShifts.map((shifts) =>
        sum(shifts.map((s) => Math.max(0, timeToMinutes(s.endTime) - timeToMinutes(s.startTime))))
      )
    )
  }

  function updateShiftTime(i: number, j: number, k: 'startTime' | 'endTime', value: string) {
    const data = [...form.data.weekShifts]
    data[i][j][k] = value
    form.setData('weekShifts', data)
    setLastEditedDay(i)
  }

  function toggleDay(i: number, checked: boolean) {
    const data = [...form.data.weekShifts]
    data[i] = checked ? [...data[i], DEFAULT_SHIFT] : []
    form.setData('weekShifts', data)
  }

  function addShift(i: number) {
    const data = [...form.data.weekShifts]
    const day = data[i]
    const lastEnd = day[day.length - 1].endTime
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
    const data = form.data.weekShifts.map((day, index) => (index === i || day.length === 0 ? day : [...source]))
    form.setData('weekShifts', data)
    setLastEditedDay(null)
  }

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (form.hasErrors) return

    form.put(urlFor('update_working_hours.execute', { agendaId: agenda.id }), {
      onSuccess: () => {
        modalRef.current?.close()
      },
    })
  }

  const weekdays = useMemo(() => getWeekdays(), [])

  return (
    <InertiaModal ref={modalRef}>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
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
                      const duration = sum(
                        shifts.map((s) => Math.max(0, timeToMinutes(s.endTime) - timeToMinutes(s.startTime)))
                      )
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
                                        <Field name={`weekShifts.${i}.${j}.startTime`}>
                                          <InputTime
                                            value={shifts[j].startTime}
                                            onChange={(value) => updateShiftTime(i, j, 'startTime', value)}
                                          />
                                          <Field.Error />
                                        </Field>
                                      </div>
                                      <div className="text-center pt-3.5">
                                        <div className="text-muted text-[15px]/5">a</div>
                                      </div>
                                      <div className="col-span-5">
                                        <Field name={`weekShifts.${i}.${j}.endTime`}>
                                          <InputTime
                                            value={shifts[j].endTime}
                                            onChange={(value) => updateShiftTime(i, j, 'endTime', value)}
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
      )}
    </InertiaModal>
  )
}

WorkingHoursForm.layout = (page: ReactElement) => <MinimalLayout>{page}</MinimalLayout>
