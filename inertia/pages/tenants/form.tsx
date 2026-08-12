import { Data } from '@generated/data'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  tenant?: Data.Tenants.Tenant
}>

export default function ShowForm(props: PageProps) {
  const { tenant } = props

  const title = 'Editar negocio'

  return (
    <>
      <FormHeader
        title={title}
        rightElement={
          <>
            <ButtonLink size="lg" variant="secondary" route="show_tenant.render">
              Cerrar
            </ButtonLink>
            <Button type="submit" size="lg" form="form">
              Guardar
            </Button>
          </>
        }
      />

      <div className="container-sm">
        <div className="pt-9 pb-8">
          <h1 className="text-[40px]/11 font-bold">{title}</h1>
        </div>

        <Form id="form" route={'update_tenant.execute'} className="gap-16 pb-24">
          <div>
            <h2 className="text-2xl font-semibold">Información del negocio</h2>
            <p className="text-[15px]/5 text-muted">Define los datos principales de tu negocio.</p>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="name" className="col-span-6">
                <Field.Label>Nombre del negocio *</Field.Label>
                <Input placeholder="Introducir el nombre del negocio" defaultValue={tenant?.name ?? ''} />
                <Field.Error />
              </Field>

              <Field name="phone">
                <Field.Label>Teléfono del negocio</Field.Label>
                <Input defaultValue={tenant?.phone ?? ''} />
                <Field.Error />
              </Field>

              <Field name="email">
                <Field.Label>Correo electrónico</Field.Label>
                <Input type="email" defaultValue={tenant?.email ?? ''} />
                <Field.Error />
              </Field>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
