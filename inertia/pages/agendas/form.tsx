import { Data } from '@generated/data'
import { useForm } from '@inertiajs/react'
import { Form } from '@base-ui/react/form'
import { SubmitEvent, useRef } from 'react'
import { InertiaModal, InertiaModalRef } from '~/components/inertia_modal'
import { CheckboxFieldArray } from '~/components/ui/checkbox_field_array'
import { COLORS_LIGHT, ColorSelect } from '~/components/ui/color_select'
import { NativeSelect } from '~/components/ui/native_select'
import { formatDuration, formatPrice } from '~/lib/utils'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Input } from '~/components/ui/input'
import { Field } from '~/components/ui/field'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  agenda?: Data.Agendas.Agenda
  services: Data.Services.Service[]
}>

export default function ShowForm(props: PageProps) {
  const { agenda, services } = props

  const modalRef = useRef<InertiaModalRef>(null)

  const isEdit = !!agenda
  const title = agenda ? `Editar ${agenda.name}` : 'Añadir un agenda'

  const isOwner = agenda?.role === 'owner'

  const form = useForm<{
    name: string
    email: string
    role: string
    color: string
    serviceIds: string[]
  }>({
    name: agenda?.name ?? '',
    email: agenda?.email ?? '',
    role: agenda?.role ?? 'none',
    color: agenda?.color ?? COLORS_LIGHT[0],
    serviceIds: agenda ? agenda.services!.map((service) => service.id) : services.map(({ id }) => id),
  })

  function handleSubmit(e?: SubmitEvent) {
    e?.preventDefault()

    if (isEdit) {
      form.put(urlFor('update_agenda.execute', { id: agenda.id }), { onSuccess: () => modalRef.current?.close() })
    } else {
      form.post(urlFor('create_agenda.execute'), { onSuccess: () => modalRef.current?.close() })
    }
  }

  return (
    <InertiaModal ref={modalRef}>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" onClick={() => handleSubmit()} disabled={form.processing}>
                  {isEdit ? 'Guardar' : 'Añadir'}
                </Button>
              </>
            }
          />

          <div className="container-sm">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold">{title}</h1>
            </div>

            <Form id="form" onSubmit={handleSubmit} errors={form.errors} className="flex flex-col gap-16 pb-24">
              <div>
                <h2 className="text-2xl font-semibold">Información básica</h2>
                <p className="text-[15px]/5 text-muted">Gestiona el agenda</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <Field name="name" className="col-span-3">
                    <Field.Label>Nombre *</Field.Label>
                    <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                    <Field.Error />
                  </Field>

                  <Field name="email" className="col-span-3">
                    <Field.Label>Email{form.data.role !== 'none' ? ' *' : ''}</Field.Label>
                    <Input value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                    <Field.Error />
                  </Field>

                  <Field name="role" className="col-span-3">
                    <Field.Label>Rol de permisos *</Field.Label>
                    <NativeSelect
                      value={form.data.role}
                      disabled={isOwner}
                      onChange={(e) => form.setData('role', e.target.value)}
                    >
                      <NativeSelect.Option value="none">Sin acceso</NativeSelect.Option>
                      {!isOwner && <NativeSelect.Option value="staff">Empleado</NativeSelect.Option>}
                      {isOwner && <NativeSelect.Option value="owner">Propietario</NativeSelect.Option>}
                    </NativeSelect>
                    <Field.Error />
                  </Field>

                  <Field name="color" className="col-span-6">
                    <Field.Label>Color del calendario *</Field.Label>
                    <ColorSelect value={form.data.color} onValueChange={(value) => form.setData('color', value)} />
                    <Field.Error />
                  </Field>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Servicios</h2>
                <p className="text-[15px]/5 text-muted">Indica los servicios que presta este agenda</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <CheckboxFieldArray
                    name="serviceIds"
                    className="col-span-6"
                    items={services}
                    value={form.data.serviceIds}
                    onChange={(value) => form.setData('serviceIds', value)}
                    getValue={(service) => service.id}
                    renderItem={(service) => (
                      <div className="flex flex-1 justify-between items-center">
                        <div>
                          <div className="text-[17px]/6 font-medium">{service.name}</div>
                          <div className="text-muted">{formatDuration(service.duration)}</div>
                        </div>
                        {service.price && <div className="text-[17px]/6 font-medium">{formatPrice(service.price)}</div>}
                      </div>
                    )}
                  />
                </div>
              </div>
            </Form>
          </div>
        </>
      )}
    </InertiaModal>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
