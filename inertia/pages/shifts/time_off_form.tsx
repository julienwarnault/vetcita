import { Data } from '@generated/data'
import { Trash2Icon } from 'lucide-react'
import { router } from '@inertiajs/react'
import { NativeSelect } from '~/components/ui/native_select'
import { InertiaModal } from '~/components/inertia_modal'
import { FormHeader } from '~/components/form_header'
import { TimeOptions } from '../working_hours/form'
import { Button } from '~/components/ui/button'
import { Banner } from '~/components/ui/banner'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import MinimalLayout from '~/layouts/minimal'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  initialDate?: string
  initialAgendaId?: string
  agendas: Data.Agendas.Agenda[]
  timeOff?: Data.Scheduling.TimeOff
}>

export default function TimeOffForm(props: PageProps) {
  const { agendas, timeOff, initialDate, initialAgendaId } = props

  const isEdit = !!timeOff
  const title = isEdit ? `Editar días libres` : 'Añadir días libres'

  return (
    <InertiaModal>
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
                      router.delete(urlFor('delete_time_off.execute', { id: timeOff.id }), { onSuccess: close })
                    }}
                  >
                    <Trash2Icon strokeWidth={1.6} className="text-destructive" />
                  </Button>
                )}
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" form="form">
                  {isEdit ? 'Guardar' : 'Añadir'}
                </Button>
              </>
            }
          />

          <div className="container-sm">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold">{title}</h1>
            </div>

            <Banner icon="circle-alert">No se puede reservar online durante los días libres</Banner>

            <Form
              id="form"
              route={isEdit ? 'update_time_off.execute' : 'create_time_off.execute'}
              routeParams={isEdit ? { id: timeOff.id } : undefined}
              className="gap-16 pb-24"
              onSuccess={close}
            >
              <div className="grid grid-cols-12 w-full gap-x-4 gap-y-6 pt-6">
                <Field name="agendaId" className="col-span-6">
                  <Field.Label>Agenda</Field.Label>
                  <NativeSelect defaultValue={timeOff?.agendaId ?? initialAgendaId ?? undefined}>
                    {agendas.map((agenda) => (
                      <NativeSelect.Option key={agenda.id} value={agenda.id}>
                        {agenda.name}
                      </NativeSelect.Option>
                    ))}
                  </NativeSelect>
                  <Field.Error />
                </Field>

                <Field name="type" className="col-span-6">
                  <Field.Label>Tipo</Field.Label>
                  <NativeSelect defaultValue={timeOff?.type ?? undefined}>
                    {['Vacaciones anuales', 'Baja por enfermedad', 'Otros motivos de ausencia'].map((type, i) => (
                      <NativeSelect.Option key={i} value={type}>
                        {type}
                      </NativeSelect.Option>
                    ))}
                  </NativeSelect>
                  <Field.Error />
                </Field>

                <Field name="start" className="col-span-6">
                  <Field.Label>Fecha de inicio</Field.Label>
                  <Input type="date" defaultValue={timeOff?.start ?? initialDate ?? undefined} />
                  <Field.Error />
                </Field>

                <Field name="startTime" className="col-span-3">
                  <Field.Label>Hora de inicio</Field.Label>
                  <NativeSelect defaultValue={timeOff?.startTime ?? '09:00:00'}>
                    <TimeOptions />
                  </NativeSelect>
                  <Field.Error />
                </Field>

                <Field name="endTime" className="col-span-3">
                  <Field.Label>Hora de finalización</Field.Label>
                  <NativeSelect defaultValue={timeOff?.endTime ?? '17:00:00'}>
                    <TimeOptions />
                  </NativeSelect>
                  <Field.Error />
                </Field>

                <Field name="end" className="col-span-6">
                  <Field.Label>Repetir hasta</Field.Label>
                  <Input type="date" defaultValue={timeOff?.end ?? initialDate ?? undefined} />
                  <Field.Error />
                </Field>

                <Field name="description" className="col-span-12">
                  <Field.Label>Descripción</Field.Label>
                  <Input
                    placeholder="Añadir descripción o comentario (opcional)"
                    defaultValue={timeOff?.description ?? ''}
                  />
                  <Field.Error />
                </Field>
              </div>
            </Form>
          </div>
        </>
      )}
    </InertiaModal>
  )
}

TimeOffForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
