import { Data } from '@generated/data'
import { useForm } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { ReactElement, SubmitEvent, useRef } from 'react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { InputWorkingHours } from '~/components/shift/input_working_hours'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
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

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    form.put(urlFor('update_working_hours.execute', { agendaId: agenda.id }), {
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
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" form="form" disabled={form.processing}>
                  Guardar
                </Button>
              </>
            }
          />

          <div className="container-sm">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold mb-3">{title}</h1>
              <div className="text-[17px]/6 text-muted">Establece turnos.</div>
            </div>

            <Form id="form" onSubmit={handleSubmit} className="gap-16 pb-24" errors={form.errors}>
              <div className="flex flex-col">
                <div className="flex flex-col gap-6">
                  <InputWorkingHours
                    name="weekShifts"
                    value={form.data.weekShifts}
                    onChange={(value) => form.setData('weekShifts', value)}
                  />
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
