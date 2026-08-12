import { Data } from '@generated/data'
import { EarthIcon } from 'lucide-react'
import { NativeSelect } from '~/components/ui/native_select'
import { InputGroup } from '~/components/ui/input_group'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  location: Data.Tenants.Location
}>

export default function ShowForm(props: PageProps) {
  const { location } = props

  const title = `Editar ${location.name}`

  return (
    <>
      <FormHeader
        title={title}
        rightElement={
          <>
            <ButtonLink size="lg" variant="secondary" route="show_settings.render">
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

        <Form id="form" route={'update_location.execute'} className="gap-16 pb-24">
          <div>
            <h2 className="text-2xl font-semibold">Información de la clínica</h2>
            <p className="text-[15px]/5 text-muted">
              Define los datos públicos que verán los clientes al reservar una cita.
            </p>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="name" className="col-span-6">
                <Field.Label>Nombre visible *</Field.Label>
                <Input placeholder="Introducir el nombre visible de la clínica" defaultValue={location?.name ?? ''} />
                <Field.Error />
              </Field>

              <Field name="phone">
                <Field.Label>Teléfono de la clínica *</Field.Label>
                <Input defaultValue={location?.phone ?? ''} />
                <Field.Error />
              </Field>

              <Field name="email">
                <Field.Label>Correo electrónico</Field.Label>
                <Input type="email" defaultValue={location?.email ?? ''} />
                <Field.Error />
              </Field>
            </div>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-semibold">Dirección</h2>
            <p className="text-[15px]/5 text-muted">Define la dirección física de la clínica.</p>

            <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
              <Field name="address" className="col-span-6">
                <Field.Label>Dirección</Field.Label>
                <Input defaultValue={location?.address ?? ''} />
                <Field.Error />
              </Field>

              <Field name="city">
                <Field.Label>Ciudad</Field.Label>
                <Input defaultValue={location?.city ?? ''} />
                <Field.Error />
              </Field>

              <Field name="state">
                <Field.Label>Estado</Field.Label>
                <Input defaultValue={location?.state ?? ''} />
                <Field.Error />
              </Field>

              <Field name="postalCode">
                <Field.Label>Código postal</Field.Label>
                <Input defaultValue={location?.postalCode ?? ''} />
                <Field.Error />
              </Field>

              <Field name="countryCode">
                <Field.Label>País</Field.Label>
                <NativeSelect defaultValue={location?.countryCode ?? 'MX'} disabled>
                  <NativeSelect.Option value="MX">México</NativeSelect.Option>
                </NativeSelect>
                <Field.Error />
              </Field>
            </div>
          </div>

          <hr />

          <div>
            <h2 className="text-2xl font-semibold">Enlaces externos</h2>
            <p className="text-[15px]/5 text-muted">
              Añade el sitio web de tu clínica y los enlaces a tus perfiles de redes sociales para compartirlos con los
              clientes.
            </p>

            <div className="grid w-full gap-y-6 pt-6">
              <Field name="website">
                <Field.Label>Sitio web</Field.Label>
                <InputGroup>
                  <InputGroup.Input placeholder="sitioweb.mx" defaultValue={location?.website ?? ''} />
                  <InputGroup.Addon>
                    <EarthIcon />
                  </InputGroup.Addon>
                </InputGroup>
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
