import { Data } from '@generated/data'
import { EarthIcon } from 'lucide-react'
import { NativeSelect } from '~/components/ui/native_select'
import { InputGroup } from '~/components/ui/input_group'
import { ButtonLink } from '~/components/ui/button_link'
import { InputImage } from '~/components/ui/input_image'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { Form } from '~/components/ui/form'
import { Card } from '~/components/ui/card'
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

      <div className="container-lg">
        <div className="pt-9 pb-8">
          <h1 className="text-[40px]/11 font-bold">{title}</h1>
        </div>

        <Form id="form" route={'update_location.execute'} className="gap-16 pb-24">
          <div className="flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-6 w-full">
              <Card size="none">
                <Card.Header>
                  <Card.Title>Información de la clínica</Card.Title>
                  <Card.Description>
                    Define los datos públicos que verán los clientes al reservar una cita.
                  </Card.Description>
                </Card.Header>

                <Card.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-6 w-full gap-x-4 gap-y-6">
                    <Field name="name" className="col-span-1 lg:col-span-6">
                      <Field.Label>Nombre visible *</Field.Label>
                      <Input
                        placeholder="Introducir el nombre visible de la clínica"
                        defaultValue={location?.name ?? ''}
                      />
                      <Field.Error />
                    </Field>

                    <Field name="phone" className="col-span-1 lg:col-span-3">
                      <Field.Label>Teléfono de la clínica *</Field.Label>
                      <Input defaultValue={location?.phone ?? ''} />
                      <Field.Error />
                    </Field>

                    <Field name="email" className="col-span-1 lg:col-span-3">
                      <Field.Label>Correo electrónico</Field.Label>
                      <Input type="email" defaultValue={location?.email ?? ''} />
                      <Field.Error />
                    </Field>
                  </div>
                </Card.Body>
              </Card>

              <Card size="none">
                <Card.Header>
                  <Card.Title>Dirección</Card.Title>
                  <Card.Description>Define la dirección física de la clínica.</Card.Description>
                </Card.Header>
                <Card.Body>
                  <div className="grid grid-cols-1 lg:grid-cols-6 w-full gap-x-4 gap-y-6">
                    <Field name="address" className="col-span-1 lg:col-span-6">
                      <Field.Label>Dirección</Field.Label>
                      <Input defaultValue={location?.address ?? ''} />
                      <Field.Error />
                    </Field>

                    <Field name="city" className="col-span-1 lg:col-span-3">
                      <Field.Label>Ciudad</Field.Label>
                      <Input defaultValue={location?.city ?? ''} />
                      <Field.Error />
                    </Field>

                    <Field name="state" className="col-span-1 lg:col-span-3">
                      <Field.Label>Estado</Field.Label>
                      <Input defaultValue={location?.state ?? ''} />
                      <Field.Error />
                    </Field>

                    <Field name="postalCode" className="col-span-1 lg:col-span-3">
                      <Field.Label>Código postal</Field.Label>
                      <Input defaultValue={location?.postalCode ?? ''} />
                      <Field.Error />
                    </Field>

                    <Field name="countryCode" className="col-span-1 lg:col-span-3">
                      <Field.Label>País</Field.Label>
                      <NativeSelect defaultValue={location?.countryCode ?? 'MX'} disabled>
                        <NativeSelect.Option value="MX">México</NativeSelect.Option>
                      </NativeSelect>
                      <Field.Error />
                    </Field>
                  </div>
                </Card.Body>
              </Card>

              <Card size="none">
                <Card.Header>
                  <Card.Title>Imagen de portada</Card.Title>
                  <Card.Description>
                    Imagen principal que aparecerá en la página pública de la clínica.
                  </Card.Description>
                </Card.Header>
                <Card.Body>
                  <Field name="cover">
                    <InputImage
                      name="cover"
                      label="Añadir imagen de portada"
                      ratio={1.5}
                      defaultValue={location?.coverUrl ?? undefined}
                    />
                    <Field.Error />
                  </Field>
                </Card.Body>
              </Card>

              <Card size="none">
                <Card.Header>
                  <Card.Title>Enlaces externos</Card.Title>
                </Card.Header>

                <Card.Body>
                  <div className="grid w-full gap-y-6">
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
                </Card.Body>
              </Card>
            </div>
            <div className="w-full xl:max-w-84 xl:grow-0">
              <Card size="none">
                <Card.Header>
                  <Card.Title>Logo</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Field name="logo">
                    <InputImage
                      name="logo"
                      label="Añadir logo"
                      ratio={1}
                      defaultValue={location?.logoUrl ?? undefined}
                    />
                    <Field.Error />
                  </Field>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
