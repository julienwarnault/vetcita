import { Data } from '@generated/data'
import { CheckboxFieldArray } from '~/components/ui/checkbox_field_array'
import { COLORS_LIGHT, ColorSelect } from '~/components/ui/color_select'
import { InertiaModal } from '~/components/inertia_modal'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { formatDuration } from '~/lib/utils'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  agenda?: Data.Agendas.Agenda
  services: Data.Services.Service[]
}>

export default function ShowForm(props: PageProps) {
  const { agenda, services } = props

  const isEdit = !!agenda
  const title = agenda ? `Editar ${agenda.name}` : 'Añadir un agenda'

  return (
    <InertiaModal>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
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

            <Form
              id="form"
              route={isEdit ? 'update_agenda.execute' : 'create_agenda.execute'}
              routeParams={isEdit ? { id: agenda.id } : undefined}
              className="gap-16 pb-24"
              onSuccess={close}
            >
              <div>
                <h2 className="text-2xl font-semibold">Información básica</h2>
                <p className="text-[15px]/5 text-muted">Gestiona el agenda</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <Field name="name" className="col-span-6">
                    <Field.Label>Nombre *</Field.Label>
                    <Input defaultValue={agenda?.name ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="color" className="col-span-6">
                    <Field.Label>Color del calendario *</Field.Label>
                    <ColorSelect defaultValue={agenda?.color ?? COLORS_LIGHT[0]} />
                    <Field.Error />
                  </Field>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Servicios</h2>
                <p className="text-[15px]/5 text-muted">Indica los servicios que presta este agenda</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <CheckboxFieldArray
                    name="serviceIds[]"
                    className="col-span-6"
                    items={services}
                    getValue={(service) => service.id}
                    renderItem={(service) => (
                      <div className="flex flex-1 justify-between items-center">
                        <div>
                          <div className="text-[17px]/6 font-medium">{service.name}</div>
                          <div className="text-muted">{formatDuration(service.duration)}</div>
                        </div>
                        {service.price && <div className="text-[17px]/6 font-medium">{service.price} MXN</div>}
                      </div>
                    )}
                    defaultValue={
                      agenda ? agenda.services!.map((service) => service.id) : services.map(({ id }) => id)
                    }
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

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
