import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import DefaultLayout from '~/layouts/default'
import { Input } from '~/components/ui/input'
import { Card } from '~/components/ui/card'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  user: Data.Identity.User
}>

export default function Account(props: PageProps) {
  const { user } = props

  const { visitModal } = useModalStack()

  return (
    <div className="min-h-full bg-background">
      <div className="container-lg py-9">
        <div className="pb-8">
          <h1 className="text-[40px]/11 font-bold">Mi cuenta</h1>
          <p className="text-[16px]/6 text-muted">Gestiona tus datos personales y la seguridad de tu cuenta.</p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-6">
            <Card size="none">
              <Card.Header>
                <Card.Title>Información personal</Card.Title>
                <Card.Description>Actualiza los datos utilizados para identificar tu cuenta.</Card.Description>
              </Card.Header>

              <Card.Body>
                <Form route="update_account.execute" className="gap-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field name="firstName">
                      <Field.Label>Nombre *</Field.Label>
                      <Input defaultValue={user.firstName ?? ''} autoComplete="given-name" />
                      <Field.Error />
                    </Field>

                    <Field name="lastName">
                      <Field.Label>Apellido *</Field.Label>
                      <Input defaultValue={user.lastName ?? ''} autoComplete="family-name" />
                      <Field.Error />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field name="email">
                      <Field.Label>Correo electrónico *</Field.Label>
                      <Input type="email" defaultValue={user.email} autoComplete="email" />
                      <Field.Error />
                    </Field>

                    <Field name="phone">
                      <Field.Label>Teléfono *</Field.Label>
                      <Input defaultValue={user.phone ?? ''} autoComplete="tel" />
                      <Field.Error />
                    </Field>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button type="submit" size="lg">
                      Guardar cambios
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <Card size="none">
              <Card.Header>
                <Card.Title>Eliminar cuenta</Card.Title>
                <Card.Description>
                  Solicita la eliminación de tu cuenta y de los accesos asociados al workspace.
                </Card.Description>
              </Card.Header>

              <Card.Body>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <p className="max-w-150 text-[15px]/5 text-muted">
                    Para proteger los datos del negocio, la eliminación de una cuenta requiere una revisión manual.
                  </p>
                  <Button type="button" variant="destructive" size="lg" disabled>
                    Solicitar eliminación
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <aside className="flex flex-col gap-6">
            <Card size="none">
              <Card.Header>
                <Card.Title>Contraseña</Card.Title>
                <Card.Description>Cambia tu contraseña manteniendo activa tu sesión actual.</Card.Description>
              </Card.Header>

              <Card.Body>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => visitModal(urlFor('update_password.render'))}
                >
                  Cambiar contraseña
                </Button>
              </Card.Body>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

Account.layout = (page: React.ReactElement) => <DefaultLayout>{page}</DefaultLayout>
