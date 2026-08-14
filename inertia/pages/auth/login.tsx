import { Link } from '@adonisjs/inertia/react'
import { InputPassword } from '~/components/ui/input_password'
import { ButtonLink } from '~/components/ui/button_link'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Logo } from '~/components/logo'
import AuthLayout from '~/layouts/auth'

export default function Login() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10 px-6 py-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Ir al inicio">
            <Logo />
          </Link>
          <ButtonLink route="signup.render" size="lg" variant="secondary">
            Crear cuenta
          </ButtonLink>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-14">
        <div className="w-full max-w-120">
          <div className="pb-10 text-center">
            <h1 className="text-[40px]/11 font-bold">Iniciar sesión</h1>
            <p className="text-[16px] text-muted">Ingresa tus datos para acceder a tu cuenta</p>
          </div>

          <Form route="login.execute" className="gap-6">
            <Field name="email">
              <Field.Label htmlFor="email">Correo electrónico</Field.Label>
              <Input type="email" placeholder="Introduce tu correo" autoComplete="username" />
              <Field.Error />
            </Field>

            <Field name="password">
              <div className="flex items-center justify-between gap-3">
                <Field.Label>Contraseña</Field.Label>
                <Link route="forgot_password.render" className="text-[14px]/5 font-medium text-accent hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
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
