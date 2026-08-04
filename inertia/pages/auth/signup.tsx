import { InputPassword } from '~/components/ui/input_password'
import { ButtonLink } from '~/components/ui/button_link'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { Card } from '~/components/ui/card'
import { Logo } from '~/components/Logo'
import AuthLayout from '~/layouts/auth'

export default function Signup() {
  return (
    <div className="bg-background min-h-screen">
      <header className="container-xl py-6">
        <div className="flex items-center justify-between">
          <Logo />

          <ButtonLink route="login.render" size="lg" variant="secondary">
            Iniciar sesión
          </ButtonLink>
        </div>
      </header>

      <main className="container-xl pb-14">
        <div className="flex w-full max-w-150 mx-auto">
          <div className="w-full">
            <Card size="xl">
              <div className="pb-8 text-center">
                <h1 className="text-2xl/8 font-semibold">Crear cuenta</h1>
                <p className="text-[15px] text-muted">Completa tus datos para empezar</p>
              </div>

              <Form route="signup.execute" className="gap-6">
                <Field name="tenantName">
                  <Field.Label>Nombre de la clínica</Field.Label>
                  <Input placeholder="Introduce un nombre" autoComplete="organization" />
                  <Field.Error />
                </Field>

                <div className="flex gap-4">
                  <Field name="firstName" className="w-full">
                    <Field.Label>Nombre</Field.Label>
                    <Input placeholder="Introduce un nombre" autoComplete="given-name" />
                    <Field.Error />
                  </Field>

                  <Field name="lastName" className="w-full">
                    <Field.Label>Apellido</Field.Label>
                    <Input placeholder="Introduce un apellido" autoComplete="family-name" />
                    <Field.Error />
                  </Field>
                </div>

                <Field name="email">
                  <Field.Label>Correo electrónico</Field.Label>
                  <Input placeholder="Introduce un correo" autoComplete="email" />
                  <Field.Error />
                </Field>

                <Field name="phone">
                  <Field.Label htmlFor="phone">Teléfono</Field.Label>
                  <Input placeholder="Introduce un teléfono" autoComplete="phone" />
                  <Field.Error />
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
                  <Button type="submit" size="lg" className="w-full">
                    Crear una cuenta
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

Signup.layout = (page: React.ReactElement) => <AuthLayout>{page}</AuthLayout>
