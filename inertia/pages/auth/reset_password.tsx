import { Link } from '@adonisjs/inertia/react'
import { InputPassword } from '~/components/ui/input_password'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Logo } from '~/components/logo'
import AuthLayout from '~/layouts/auth'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  token: string
}>

export default function ResetPassword(props: PageProps) {
  const { token } = props

  return (
    <>
      <header className="px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Ir al inicio">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-6 py-14">
        <div className="w-full max-w-120">
          <div className="pb-10 text-center">
            <h1 className="text-[40px]/11 font-bold">Nueva contraseña</h1>
            <p className="text-[16px] text-muted">Elige una nueva contraseña para acceder a tu cuenta.</p>
          </div>

          <Form route="reset_password.execute" className="gap-6">
            <Field name="token" className="hidden">
              <Input type="hidden" defaultValue={token} />
            </Field>

            <Field name="password">
              <Field.Label>Contraseña</Field.Label>
              <InputPassword placeholder="Introduce una contraseña" autoComplete="new-password" />
              <Field.Error />
            </Field>

            <Field name="passwordConfirmation">
              <Field.Label>Confirmar contraseña</Field.Label>
              <InputPassword placeholder="Confirma tu contraseña" autoComplete="new-password" />
              <Field.Error />
            </Field>

            <div>
              <Button type="submit" size="lg" className="w-full mt-6">
                Guardar contraseña
              </Button>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

ResetPassword.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
