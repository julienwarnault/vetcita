import { InputPassword } from '~/components/ui/input_password'
import { InertiaModal } from '~/components/inertia_modal'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import MinimalLayout from '~/layouts/minimal'
import { Form } from '~/components/ui/form'

export default function UpdatePassword() {
  return (
    <InertiaModal>
      {({ close }) => (
        <>
          <FormHeader
            title="Cambiar contraseña"
            rightElement={
              <>
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" form="form">
                  Guardar
                </Button>
              </>
            }
          />

          <div className="container-sm">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold">Cambiar contraseña</h1>
              <p className="text-[17px]/6 text-muted">Introduce tu contraseña actual y define una nueva contraseña.</p>
            </div>

            <Form id="form" route="update_password.execute" className="gap-6 pb-24">
              <Field name="currentPassword">
                <Field.Label>Contraseña actual</Field.Label>
                <InputPassword placeholder="Introduce tu contraseña actual" autoComplete="current-password" />
                <Field.Description>
                  Si no recuerdas tu contraseña actual, cierra la sesión y utiliza el enlace de Contraseña olvidada en
                  la página de inicio de sesión para restablecer tu contraseña.
                </Field.Description>
                <Field.Error />
              </Field>

              <Field name="password">
                <Field.Label>Nueva contraseña</Field.Label>
                <InputPassword placeholder="Introduce una nueva contraseña" autoComplete="new-password" />
                <Field.Error />
              </Field>

              <Field name="passwordConfirmation">
                <Field.Label>Confirmar nueva contraseña</Field.Label>
                <InputPassword placeholder="Confirma la nueva contraseña" autoComplete="new-password" />
                <Field.Error />
              </Field>
            </Form>
          </div>
        </>
      )}
    </InertiaModal>
  )
}

UpdatePassword.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
