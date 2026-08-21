import { Data } from '@generated/data'
import { Link } from '@adonisjs/inertia/react'
import { InputPassword } from '~/components/ui/input_password'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Logo } from '~/components/logo'
import AuthLayout from '~/layouts/auth'
import { InertiaProps } from '~/types'
import { appName } from '~/app/app'

type PageProps = InertiaProps<{
  token: string
  invitation: Data.Agendas.Invitation
}>

export default function AcceptInvitation(props: PageProps) {
  const { invitation, token } = props
  const tenant = invitation.tenant

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10 px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="w-full max-w-120">
          <div className="pb-10 text-center">
            <h1 className="text-[40px]/11 font-bold">Aceptar invitación</h1>
            <p className="text-[16px] text-muted">
              Crea tu cuenta para acceder al espacio de {tenant?.name || 'tu clínica'} en {appName}.
            </p>
          </div>

          <Form route="accept_invitation.execute" routeParams={{ token }} className="gap-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Field name="firstName" className="w-full">
                <Field.Label>Nombre</Field.Label>
                <Input
                  name="firstName"
                  placeholder="Introduce un nombre"
                  autoComplete="given-name"
                  defaultValue={invitation?.agenda?.firstName ?? ''}
                />
                <Field.Error />
              </Field>

              <Field name="lastName" className="w-full">
                <Field.Label>Apellido</Field.Label>
                <Input
                  name="lastName"
                  placeholder="Introduce un apellido"
                  autoComplete="family-name"
                  defaultValue={invitation?.agenda?.lastName ?? ''}
                />
                <Field.Error />
              </Field>
            </div>

            <Field name="phone">
              <Field.Label htmlFor="phone">Teléfono</Field.Label>
              <Input
                name="phone"
                type="tel"
                placeholder="Introduce un teléfono"
                autoComplete="tel"
                defaultValue={invitation?.agenda?.phone ?? ''}
              />
              <Field.Error />
            </Field>

            <Field name="password">
              <Field.Label>Contraseña</Field.Label>
              <InputPassword name="password" placeholder="Introduce una contraseña" autoComplete="new-password" />
              <Field.Error />
            </Field>

            <Field name="passwordConfirmation">
              <Field.Label>Confirmar contraseña</Field.Label>
              <InputPassword
                name="passwordConfirmation"
                placeholder="Confirma tu contraseña"
                autoComplete="new-password"
              />
              <Field.Error />
            </Field>

            <div>
              <Button type="submit" size="lg" className="w-full mt-6">
                Activar acceso
              </Button>
              <p className="mt-4 text-center text-[14px]/5 text-muted">
                Al crear una cuenta, aceptas los{' '}
                <Link href="/terms" className="underline underline-offset-3 hover:text-foreground">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacy-policy" className="underline underline-offset-3 hover:text-foreground">
                  política de privacidad
                </Link>{' '}
                de {appName}.
              </p>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

AcceptInvitation.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
