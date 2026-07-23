import { Data } from '@generated/data'
import { InertiaModal } from '~/components/inertia_modal'
import { FormHeader } from '~/components/form_header'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  client?: Data.Clients.Client
}>

export default function ShowForm(props: PageProps) {
  const { client } = props

  const isEdit = !!client
  const title = client ? `Editar ${client.firstName}` : 'Añadir un cliente'

  return (
    <InertiaModal>
      {({ close, emit }) => (
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
              route={isEdit ? 'update_client.execute' : 'create_client.execute'}
              routeParams={isEdit ? { id: client.id } : undefined}
              className="gap-16 pb-24"
              onSuccess={(data: any) => {
                !isEdit && emit('onCreate', data.props.flash.clientId)
                close()
              }}
            >
              <div>
                <h2 className="text-2xl font-semibold">Perfil</h2>
                <p className="text-[15px]/5 text-muted">Gestiona el perfil personal de tu cliente</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <Field name="firstName">
                    <Field.Label>Nombre *</Field.Label>
                    <Input defaultValue={client?.firstName ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="lastName">
                    <Field.Label>Apellido *</Field.Label>
                    <Input defaultValue={client?.lastName ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="phone">
                    <Field.Label>Teléfono *</Field.Label>
                    <Input defaultValue={client?.phone ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="email">
                    <Field.Label>Correo electrónico</Field.Label>
                    <Input type="email" defaultValue={client?.email ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="notes" className="col-span-6">
                    <Field.Label>Comentarios</Field.Label>
                    <Textarea placeholder="Añadir un comentario privado" defaultValue={client?.notes ?? ''} />
                    <Field.Error />
                  </Field>
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
