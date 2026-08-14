import { Link } from '@adonisjs/inertia/react'
import { ButtonLink } from '~/components/ui/button_link'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Logo } from '~/components/logo'
import AuthLayout from '~/layouts/auth'

export default function ForgotPassword() {
  return (
    <>
      <header className="px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Ir al inicio">
            <Logo />
          </Link>
          <ButtonLink route="login.render" size="lg" variant="secondary">
            Iniciar sesión
          </ButtonLink>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-6 py-14">
        <div className="w-full max-w-120">
          <div className="pb-10 text-center">
            <h1 className="text-[40px]/11 font-bold">Restablecer contraseña</h1>
            <p className="text-[16px] text-muted">
              Indica tu correo y te enviaremos un enlace para crear una nueva contraseña.
            </p>
          </div>

          <Form route="forgot_password.execute">
            <Field name="email">
              <Field.Label htmlFor="email">Correo electrónico</Field.Label>
              <Input type="email" placeholder="Introduce tu correo" autoComplete="username" />
              <Field.Error />
            </Field>

            <div>
              <Button type="submit" size="lg" className="w-full mt-6">
                Enviar enlace
              </Button>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

ForgotPassword.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
