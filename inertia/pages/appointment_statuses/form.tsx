import { Data } from '@generated/data'
import { COLORS_DARK, ColorSelect } from '~/components/ui/color_select'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  status?: Data.AppointmentWorkflow.AppointmentStatus
}>

export default function ShowForm(props: PageProps) {
  const { status } = props

  const isEdit = !!status
  const title = status ? 'Editar el estado de la cita' : 'Añadir un estado'

  return (
    <>
      <FormHeader
        title={title}
        rightElement={
          <>
            <ButtonLink size="lg" variant="secondary" route="list_appointment_statuses.render">
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
          route={isEdit ? 'update_appointment_status.execute' : 'create_appointment_status.execute'}
          routeParams={isEdit ? { id: status.id } : undefined}
          className="gap-16 pb-24"
        >
          <div>
            <h2 className="text-2xl font-semibold">Información del estado</h2>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="name" className="col-span-6">
                <Field.Label>Nombre del estado *</Field.Label>
                <Input placeholder="Añade un nombre para el estado" defaultValue={status?.name ?? ''} />
                <Field.Error />
              </Field>

              <Field name="color" className="col-span-6">
                <Field.Label>Selecciona un color para el estado *</Field.Label>
                <ColorSelect mode="dark" defaultValue={status?.color ?? COLORS_DARK[0]} />
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
