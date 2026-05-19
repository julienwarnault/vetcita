import { Data } from '@generated/data'
import { COLORS, ColorSelect } from '~/components/ui/color_select'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import { Textarea } from '~/components/ui/textarea'
import { Select } from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  appointmentType?: Data.AppointmentTypes.AppointmentType
}>

export default function ShowForm(props: PageProps) {
  const { appointmentType } = props

  const isEdit = !!appointmentType
  const title = appointmentType ? `Editar ${appointmentType.name}` : 'Añadir un tipo de cita'

  return (
    <>
      <FormHeader title={title}>
        <ButtonLink size="lg" variant="secondary" route="list_appointment_types.render">
          Cerrar
        </ButtonLink>
        <Button type="submit" size="lg" form="form">
          Guardar
        </Button>
      </FormHeader>

      <div className="mx-auto max-w-200 w-full">
        <div className="pt-9 pb-8">
          <h1 className="text-[40px]/11 font-bold">{title}</h1>
        </div>

        <Form
          id="form"
          route={isEdit ? 'update_appointment_type.execute' : 'create_appointment_type.execute'}
          routeParams={isEdit ? { id: appointmentType.id } : undefined}
          className="gap-16 pb-24"
        >
          <div>
            <h2 className="text-2xl font-semibold">Información básica</h2>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="name" className="col-span-6">
                <Field.Label>Nombre del tipo de cita *</Field.Label>
                <Input
                  placeholder="Añade un nombre de tipo de cita"
                  defaultValue={appointmentType?.name ?? ''}
                />
                <Field.Error />
              </Field>

              <Field name="color" className="col-span-6">
                <Field.Label>Color del calendario *</Field.Label>
                <ColorSelect defaultValue={appointmentType?.color ?? COLORS[0]} />
                <Field.Error />
              </Field>

              <Field name="description" className="col-span-6">
                <Field.Label>Descripción</Field.Label>
                <Textarea
                  placeholder="Añade una breve descripción del tipo de cita"
                  defaultValue={appointmentType?.description ?? ''}
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
                <Input
                  type="number"
                  placeholder="0.00"
                  defaultValue={appointmentType?.price ?? ''}
                />
                <Field.Error />
              </Field>

              <Field name="duration">
                <Field.Label>Duración *</Field.Label>
                <Select
                  items={[
                    { label: '5 min', value: '5' },
                    { label: '10 min', value: '10' },
                    { label: '15 min', value: '15' },
                    { label: '20 min', value: '20' },
                    { label: '35 min', value: '25' },
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
                  defaultValue={appointmentType?.duration?.toString() || '30'}
                />
                <Field.Error />
              </Field>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
