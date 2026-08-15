import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { router, useForm } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { useEffect, SubmitEvent, useRef, useMemo } from 'react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { DEFAULT_SHIFT, getNextShift } from '~/lib/scheduling'
import { InputTime } from '~/components/shift/input_time'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import { Banner } from '~/components/ui/banner'
import { Field } from '~/components/ui/field'
import MinimalLayout from '~/layouts/minimal'
import { Empty } from '~/components/ui/empty'
import { DEFAULT_LOCALE } from '~/lib/date'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  date: string
  agenda: Data.Agendas.Agenda
  scheduleDay?: Data.Scheduling.ScheduleDay
  workingHours?: Data.Scheduling.WorkingHour[]
}>

export default function ScheduleDayForm(props: PageProps) {
  const { date, agenda, scheduleDay, workingHours } = props

  const modalRef = useRef<InertiaModalRef>(null)

  const isEdit = !!scheduleDay
  const title = `Turno de ${agenda.fullName} el ${DateTime.fromISO(date).setLocale(DEFAULT_LOCALE).toFormat('ccc, d LLL')}`

  const shifts = useMemo(() => {
    return scheduleDay && scheduleDay.shifts.length > 0
      ? scheduleDay.shifts
      : workingHours?.flatMap((workingHour) => ({ startTime: workingHour.startTime, endTime: workingHour.endTime })) ||
          []
  }, [scheduleDay, workingHours])

  const form = useForm({
    date: date,
    agendaId: agenda.id,
    shifts: shifts,
  })

  useEffect(() => {
    const errors: { [field: string]: string } = {}

    const shifts = [...form.data.shifts]

    for (let j = 0; j < shifts.length; j++) {
      const { startTime: start, endTime: end } = shifts[j]

      if (j > 0) {
        const { endTime: previousEnd } = shifts[j - 1]

        if (previousEnd > start) {
          errors[`shifts.${j - 1}.endTime`] = 'El turno coincide con otro'
          errors[`shifts.${j}.startTime`] = 'El turno coincide con otro'
        }
      }

      if (start > end) {
        errors[`shifts.${j}.endTime`] = 'La hora de finalización debe ser posterior a la hora de inicio'
      }
    }

    form.clearErrors()
    if (Object.keys(errors).length > 0) form.setError(errors)
  }, [form.data.shifts])

  function updateShiftTime(j: number, k: 'startTime' | 'endTime', value: string) {
    const data = [...form.data.shifts]
    data[j][k] = value
    form.setData('shifts', data)
  }

  function addShift() {
    let day = [...form.data.shifts]
    const lastEnd = day[day.length - 1]?.endTime
    const data = [...day, lastEnd ? getNextShift(lastEnd) : DEFAULT_SHIFT]
    form.setData('shifts', data)
  }

  function removeShift(j: number) {
    let data = [...form.data.shifts]
    data = data.filter((_, index) => index !== j)
    form.setData('shifts', data)
  }

  function handleSubmit(e?: SubmitEvent) {
    e?.preventDefault()

    if (form.hasErrors) return

    if (isEdit) {
      form.put(urlFor('update_schedule_day.execute', { id: scheduleDay.id }), {
        onSuccess: () => modalRef.current?.close(),
      })
    } else {
      form.post(urlFor('create_schedule_day.execute'), {
        onSuccess: () => modalRef.current?.close(),
      })
    }
  }

  return (
    <InertiaModal ref={modalRef}>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
                {isEdit && (
                  <Button
                    size="icon-lg"
                    variant="secondary"
                    onClick={() => {
                      router.delete(urlFor('delete_schedule_day.execute', { id: scheduleDay.id }), { onSuccess: close })
                    }}
                  >
                    <Trash2Icon strokeWidth={1.6} className="text-destructive" />
                  </Button>
                )}
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" form="form">
                  Guardar
                </Button>
              </>
            }
          />

          <div className="container-sm">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold">{title}</h1>
            </div>

            <Banner icon="circle-alert">Solo estás editando los turnos de este día</Banner>

            <Form id="form" onSubmit={handleSubmit} className="gap-16 pb-24" errors={form.errors}>
              <div className="flex flex-col gap-x-1 gap-y-6 col-span-9 pt-6">
                {form.data.shifts.map((_, j) => {
                  return (
                    <div key={j} className="grid grid-cols-11 gap-4">
                      <div className="col-span-5">
                        <Field name={`shifts.${j}.startTime`}>
                          <InputTime
                            value={form.data.shifts[j].startTime}
                            onChange={(value) => updateShiftTime(j, 'startTime', value)}
                          />
                          <Field.Error />
                        </Field>
                      </div>
                      <div className="col-span-5">
                        <Field name={`shifts.${j}.endTime`}>
                          <InputTime
                            value={form.data.shifts[j].endTime}
                            onChange={(value) => updateShiftTime(j, 'endTime', value)}
                          />
                          <Field.Error />
                        </Field>
                      </div>

                      <div className="flex justify-end col-span-1">
                        <Button size="icon-lg" rounded="full" variant="tertiary" onClick={() => removeShift(j)}>
                          <Trash2Icon size={22} strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {form.data.shifts.length === 0 && <Empty icon="circle-x" heading="No está trabajando" />}

                <div>
                  <Button variant="secondary" onClick={addShift}>
                    <PlusCircleIcon size={18} />
                    Añadir turno
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </>
      )}
    </InertiaModal>
  )
}

ScheduleDayForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
