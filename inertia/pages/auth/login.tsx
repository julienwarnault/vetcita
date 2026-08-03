import { InputPassword } from '~/components/ui/input_password'
import { ButtonLink } from '~/components/ui/button_link'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Card } from '~/components/ui/card'
import AuthLayout from '~/layouts/auth'
import { appName } from '~/app/app'

export default function Login() {
  return (
    <div className="bg-background min-h-screen">
      <header className="container-xl py-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">{appName}</div>

          <ButtonLink route="signup.render" size="lg" variant="secondary">
            Crear cuenta
          </ButtonLink>
        </div>
      </header>

      <main className="container-xl pt-24 pb-14">
        <div className="flex w-full max-w-150 mx-auto">
          <div className="w-full">
            <Card size="xl">
              <div className="pb-8 text-center">
                <h1 className="text-2xl/8 font-semibold">Iniciar sesión</h1>
                <p className="text-[15px] text-muted">Ingresa tus datos para acceder a tu cuenta</p>
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
                  <Button type="submit" size="lg" className="w-full">
                    Iniciar sesión
                  </Button>
                </div>
              </Form>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

Login.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
