import { Link } from '@adonisjs/inertia/react'
import { InputPassword } from '~/components/ui/input_password'
import { ButtonLink } from '~/components/ui/button_link'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Logo } from '~/components/logo'
import AuthLayout from '~/layouts/auth'

export default function Signup() {
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
            <h1 className="text-[40px]/11 font-bold">Crear cuenta</h1>
            <p className="text-[16px] text-muted">Completa tus datos para empezar</p>
          </div>

          <Form route="signup.execute" className="gap-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Field name="firstName" className="w-full">
                <Field.Label>Nombre</Field.Label>
                <Input name="firstName" placeholder="Introduce un nombre" autoComplete="given-name" />
                <Field.Error />
              </Field>

              <Field name="lastName" className="w-full">
                <Field.Label>Apellido</Field.Label>
                <Input name="lastName" placeholder="Introduce un apellido" autoComplete="family-name" />
                <Field.Error />
              </Field>
            </div>

            <Field name="email">
              <Field.Label>Correo electrónico</Field.Label>
              <Input name="email" type="email" placeholder="Introduce un correo" autoComplete="email" />
              <Field.Error />
            </Field>

            <Field name="phone">
              <Field.Label htmlFor="phone">Teléfono</Field.Label>
              <Input name="phone" type="tel" placeholder="Introduce un teléfono" autoComplete="tel" />
              <Field.Error />
            </Field>

            <Field name="password">
              <Field.Label>Contraseña</Field.Label>
              <InputPassword name="password" placeholder="Introduce una contraseña" autoComplete="new-password" />
              <Field.Error />
            </Field>

            <Field name="passwordConfirmation">
              <Field.Label>Confirmar contraseña</Field.Label>
              <InputPassword name="passwordConfirmation" placeholder="Confirma tu contraseña" autoComplete="new-password" />
              <Field.Error />
            </Field>

            <div>
              <Button type="submit" size="lg" className="w-full mt-6">
                Crear una cuenta
              </Button>
              <p className="mt-4 text-center text-[14px]/5 text-muted">
                Al crear una cuenta, aceptas las condiciones de uso y la política de privacidad de Vetcita.
              </p>
            </div>
          </Form>
        </div>
      </main>
    </>
  )
}

Signup.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
