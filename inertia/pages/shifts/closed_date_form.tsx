import { Data } from '@generated/data'
import { Trash2Icon } from 'lucide-react'
import { router } from '@inertiajs/react'
import { InertiaModal } from '~/components/inertia_modal'
import { FormHeader } from '~/components/form_header'
import { Button } from '~/components/ui/button'
import { Banner } from '~/components/ui/banner'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import MinimalLayout from '~/layouts/minimal'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  initialDate?: string
  closedDate?: Data.Scheduling.ClosedDate
}>

export default function ClosedDateForm(props: PageProps) {
  const { closedDate, initialDate } = props

  const isEdit = !!closedDate
  const title = isEdit ? `Editar fechas de cierre` : 'Añadir fechas de cierre'

  return (
    <InertiaModal>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
                {isEdit && (
                  <Button
                    size="icon-lg"
                    variant="secondary"
                    onClick={() => {
                      router.delete(urlFor('delete_closed_date.execute', { id: closedDate.id }), { onSuccess: close })
                    }}
                  >
                    <Trash2Icon strokeWidth={1.6} className="text-destructive" />
                  </Button>
                )}
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" form="form">
                  {isEdit ? 'Guardar' : 'Añadir'}
                </Button>
              </>
            }
          />

          <div className="container-sm">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold">{title}</h1>
            </div>

            <Banner icon="circle-alert">No se pueden hacer reservas online cuando el negocio está cerrado</Banner>

            <Form
              id="form"
              route={isEdit ? 'update_closed_date.execute' : 'create_closed_date.execute'}
              routeParams={isEdit ? { id: closedDate.id } : undefined}
              className="gap-16 pb-24"
              onSuccess={close}
            >
              <div className="flex flex-col w-full gap-y-6 pt-6">
                <Field name="start" className="col-span-6">
                  <Field.Label>Fecha de inicio *</Field.Label>
                  <Input type="date" defaultValue={closedDate?.start ?? initialDate ?? undefined} />
                  <Field.Error />
                </Field>

                <Field name="end" className="col-span-6">
                  <Field.Label>Fecha de finalización *</Field.Label>
                  <Input type="date" defaultValue={closedDate?.end ?? initialDate ?? undefined} />
                  <Field.Error />
                </Field>

                <Field name="description" className="col-span-6">
                  <Field.Label>Descripción</Field.Label>
                  <Input placeholder="Por ejemplo, día festivo" defaultValue={closedDate?.description ?? ''} />
                  <Field.Error />
                </Field>
              </div>
            </Form>
          </div>
        </>
      )}
    </InertiaModal>
  )
}

ClosedDateForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
