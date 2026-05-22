import { Data } from '@generated/data'
import { COLORS, ColorSelect } from '~/components/ui/color_select'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  agenda?: Data.Agendas.Agenda
}>

export default function ShowForm(props: PageProps) {
  const { agenda } = props

  const isEdit = !!agenda
  const title = agenda ? `Editar ${agenda.name}` : 'Añadir un agenda'

  return (
    <>
      <FormHeader
        title={title}
        rightElement={
          <>
            <ButtonLink size="lg" variant="secondary" route="list_agendas.render">
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
          route={isEdit ? 'update_agenda.execute' : 'create_agenda.execute'}
          routeParams={isEdit ? { id: agenda.id } : undefined}
          className="gap-16 pb-24"
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
                <ColorSelect defaultValue={agenda?.color ?? COLORS[0]} />
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
