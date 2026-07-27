import { Data } from '@generated/data'
import { CheckboxFieldArray } from '~/components/ui/checkbox_field_array'
import { COLORS_LIGHT, ColorSelect } from '~/components/ui/color_select'
import { InputSelect } from '~/components/ui/input_select'
import { ButtonLink } from '~/components/ui/button_link'
import { InputGroup } from '~/components/ui/input_group'
import { FormHeader } from '~/components/form_header'
import { Textarea } from '~/components/ui/textarea'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  service?: Data.Services.Service
  agendas: Data.Agendas.Agenda[]
}>

export default function ShowForm(props: PageProps) {
  const { service, agendas } = props

  const isEdit = !!service
  const title = service ? `Editar ${service.name}` : 'Añadir un servicio'

  return (
    <>
      <FormHeader
        title={title}
        rightElement={
          <>
            <ButtonLink size="lg" variant="secondary" route="list_services.render">
              Cerrar
            </ButtonLink>
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
          route={isEdit ? 'update_service.execute' : 'create_service.execute'}
          routeParams={isEdit ? { id: service.id } : undefined}
          className="gap-16 pb-24"
        >
          <div>
            <h2 className="text-2xl font-semibold">Información básica</h2>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="name" className="col-span-6">
                <Field.Label>Nombre del servicio *</Field.Label>
                <Input placeholder="Añade un nombre de servicio" defaultValue={service?.name ?? ''} />
                <Field.Error />
              </Field>

              <Field name="color" className="col-span-6">
                <Field.Label>Color del calendario *</Field.Label>
                <ColorSelect defaultValue={service?.color ?? COLORS_LIGHT[0]} />
                <Field.Error />
              </Field>

              <Field name="description" className="col-span-6">
                <Field.Label>Descripción</Field.Label>
                <Textarea
                  placeholder="Añade una breve descripción del servicio"
                  defaultValue={service?.description ?? ''}
                />
                <Field.Error />
              </Field>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Precio y duración</h2>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="price">
                <Field.Label>Precio</Field.Label>
                <InputGroup>
                  <InputGroup.Input type="number" placeholder="0.00" defaultValue={service?.price ?? ''} />
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <InputGroup.Addon align="end">MXN</InputGroup.Addon>
                </InputGroup>
                <Field.Error />
              </Field>

              <Field name="duration">
                <Field.Label>Duración *</Field.Label>
                <InputSelect
                  items={[
                    { label: '5 min', value: '5' },
                    { label: '10 min', value: '10' },
                    { label: '15 min', value: '15' },
                    { label: '20 min', value: '20' },
                    { label: '25 min', value: '25' },
                    { label: '30 min', value: '30' },
                    { label: '35 min', value: '35' },
                    { label: '40 min', value: '40' },
                    { label: '45 min', value: '45' },
                    { label: '50 min', value: '50' },
                    { label: '55 min', value: '55' },
                    { label: '1h', value: '60' },
                    { label: '1h y 30 min', value: '90' },
                    { label: '2h', value: '120' },
                    { label: '2h y 30 min', value: '150' },
                    { label: '3h', value: '180' },
                    { label: '3h y 30 min', value: '210' },
                    { label: '4h', value: '240' },
                  ]}
                  defaultValue={service?.duration?.toString() || '30'}
                />
                <Field.Error />
              </Field>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Agendas necesarios</h2>
            <p className="text-[15px]/5 text-muted">Elige qué agenda realizarán este servicio</p>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <CheckboxFieldArray
                name="agendaIds[]"
                className="col-span-6"
                items={agendas}
                getValue={(agenda) => agenda.id}
                renderItem={(agenda) => (
                  <div className="flex items-center gap-3">
                    <Avatar fullName={agenda.name} color={agenda.color} />
                    <div className="text-[17px]/6 font-medium">{agenda.name}</div>
                  </div>
                )}
                defaultValue={
                  service ? service.agendas!.map((agenda) => agenda.id) : agendas.map(({ id }) => id)
                }
              />
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
