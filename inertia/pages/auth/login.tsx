import { InputPassword } from '~/components/ui/input_password'
import { ButtonLink } from '~/components/ui/button_link'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Logo } from '~/components/Logo'
import AuthLayout from '~/layouts/auth'
import { Link } from '@adonisjs/inertia/react'

export default function Login() {
  return (
    <>
      <header className="px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Ir al inicio">
            <Logo />
          </Link>
          <ButtonLink route="signup.render" size="lg" variant="secondary">
            Crear cuenta
          </ButtonLink>
        </div>
      </header>

      <main className="flex flex-1 justify-center px-6 py-14">
        <div className="w-full max-w-120">
          <div className="pb-10 text-center">
            <h1 className="text-[40px]/11 font-bold">Iniciar sesión</h1>
            <p className="text-[16px] text-muted">Ingresa tus datos para acceder a tu cuenta</p>
          </div>

          <Form route="login.execute">
            <Field name="email">
              <Field.Label htmlFor="email">Correo electrónico</Field.Label>
              <Input type="email" placeholder="Introduce tu correo" autoComplete="username" />
              <Field.Error />
            </Field>

            <Field name="password">
              <Field.Label>Contraseña</Field.Label>
              <InputPassword placeholder="Introduce tu contraseña" autoComplete="current-password" />
              <Field.Error />
            </Field>

            <div>
              <Button type="submit" size="lg" className="w-full mt-6">
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

Login.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
