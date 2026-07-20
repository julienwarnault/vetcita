import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useForm } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { useEffect, SubmitEvent, useRef } from 'react'
import { PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { NativeSelect } from '~/components/ui/native_select'
import { FormHeader } from '~/components/form_header'
import { TimeOptions } from '../working_hours/form'
import { Button } from '~/components/ui/button'
import { Banner } from '~/components/ui/banner'
import { Field } from '~/components/ui/field'
import MinimalLayout from '~/layouts/minimal'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  date: string
  agenda: Data.Agendas.Agenda
  shifts: Data.Scheduling.Shift[]
}>

export function getNextShift(lastEnd: string): { startTime: string; endTime: string } {
  const parsedEnd = DateTime.fromFormat(lastEnd, 'HH:mm:ss')
  const cap = DateTime.fromFormat('22:00:00', 'HH:mm:ss')
  const max = DateTime.fromFormat('23:55:00', 'HH:mm:ss')

  const base = DateTime.min(parsedEnd, cap)

  const start = DateTime.min(base.plus({ hours: 1 }), max)
  const end = DateTime.min(base.plus({ hours: 2 }), max)

  return { startTime: start.toFormat('HH:mm:ss'), endTime: end.toFormat('HH:mm:ss') }
}

export default function ScheduleDayForm(props: PageProps) {
  const { date, agenda, shifts } = props

  const modalRef = useRef<InertiaModalRef>(null)

  const title = `Turno de ${agenda.name} el ${DateTime.fromISO(date).setLocale(DEFAULT_LOCALE).toFormat('ccc, d LLL')}`

  const form = useForm({
    shifts:
      shifts.length > 0
        ? shifts.map((shift) => ({
            startTime: DateTime.fromISO(shift.start!, { zone: DEFAULT_TIMEZONE }).toFormat('HH:mm:ss'),
            endTime: DateTime.fromISO(shift.end!, { zone: DEFAULT_TIMEZONE }).toFormat('HH:mm:ss'),
          }))
        : [{ startTime: '09:00:00', endTime: '17:00:00' }],
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
    const lastEnd = day[day.length - 1].endTime
    const data = [...day, getNextShift(lastEnd)]
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

    form.put(urlFor('upsert_schedule_day.execute', { agendaId: agenda.id, date }), {
      onSuccess: () => {
        modalRef.current?.close()
      },
    })
  }

  return (
    <InertiaModal ref={modalRef}>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
                <Button
                  size="icon-lg"
                  variant="secondary"
                  onClick={() => {
                    form.setData('shifts', [])
                    handleSubmit()
                  }}
                >
                  <Trash2Icon strokeWidth={1.6} className="text-destructive" />
                </Button>
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
                          <NativeSelect
                            value={form.data.shifts[j].startTime}
                            onChange={(e) => updateShiftTime(j, 'startTime', e.target.value)}
                          >
                            <TimeOptions />
                          </NativeSelect>
                          <Field.Error />
                        </Field>
                      </div>
                      <div className="col-span-5">
                        <Field name={`shifts.${j}.endTime`}>
                          <NativeSelect
                            value={form.data.shifts[j].endTime}
                            onChange={(e) => updateShiftTime(j, 'endTime', e.target.value)}
                          >
                            <TimeOptions />
                          </NativeSelect>
                          <Field.Error />
                        </Field>
                      </div>

                      <div className="flex justify-end col-span-1">
                        <Button
                          size="icon-lg"
                          rounded="full"
                          variant="tertiary"
                          disabled={form.data.shifts.length === 1}
                          onClick={() => removeShift(j)}
                        >
                          <Trash2Icon size={22} strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  )
                })}

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
