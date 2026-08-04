import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { NativeSelect } from '~/components/ui/native_select'
import { InertiaDrawer } from '~/components/inertia_drawer'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { Drawer } from '~/components/ui/drawer'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  pet: Data.Pets.Pet
  prescription?: Data.MedicalRecords.Prescription
}>

function dateInputValue(value?: string | Date | null) {
  if (!value) return ''
  return DateTime.fromISO(value + '').toFormat('yyyy-MM-dd')
}

const PRESCRIPTION_TYPES = [
  'Vacunacion',
  'Desparasitacion',
  'Chequeo general',
  'Estetica',
  'Dental',
  'Otro',
]

export default function PrescriptionForm(props: PageProps) {
  const { pet, prescription } = props

  const isEdit = !!prescription
  const title = isEdit ? 'Editar prescripción' : 'Añadir una prescripción'

  return (
    <InertiaDrawer>
      {({ close }) => (
        <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
          <Drawer.Header className="px-8 py-6">
            <div>
              <h1 className="text-[28px]/9 font-semibold">{title}</h1>
            </div>
          </Drawer.Header>
          <Drawer.Body className="overflow-y-auto">
            <Form
              id="form"
              route={isEdit ? 'update_prescription.execute' : 'create_prescription.execute'}
              routeParams={isEdit ? { petId: pet.id, id: prescription.id } : { petId: pet.id }}
              className="min-h-0 gap-0"
              onSuccess={() => {
                close()
              }}
            >
              <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6">
                <Field name="name" className="col-span-6">
                  <Field.Label>Nombre *</Field.Label>
                  <Input defaultValue={prescription?.name ?? ''} />
                  <Field.Error />
                </Field>

                <Field name="type" className="col-span-6">
                  <Field.Label>Tipo *</Field.Label>
                  <NativeSelect defaultValue={prescription?.type ?? ''}>
                    <NativeSelect.Option value="">Seleccionar tipo</NativeSelect.Option>
                    {PRESCRIPTION_TYPES.map((type) => (
                      <NativeSelect.Option key={type} value={type}>
                        {type}
                      </NativeSelect.Option>
                    ))}
                  </NativeSelect>
                  <Field.Error />
                </Field>

                <Field name="date" className="col-span-3">
                  <Field.Label>Fecha *</Field.Label>
                  <Input type="date" defaultValue={dateInputValue(prescription?.date)} />
                  <Field.Error />
                </Field>

                <Field name="intervalDays" className="col-span-3">
                  <Field.Label>Intervalo (días)</Field.Label>
                  <Input type="number" min="1" defaultValue={prescription?.intervalDays ?? ''} />
                  <Field.Error />
                </Field>

                <Field name="notes" className="col-span-6">
                  <Field.Label>Notas</Field.Label>
                  <Textarea placeholder="Añadir observaciones sobre la prescripción" defaultValue={prescription?.notes ?? ''} />
                  <Field.Error />
                </Field>
              </div>
            </Form>
          </Drawer.Body>

          <Drawer.Footer className="px-8 py-4">
            <Button type="submit" size="lg" form="form" className="w-full" variant="primary">
              {isEdit ? 'Guardar' : 'Añadir'}
            </Button>
          </Drawer.Footer>
        </Drawer.MainPanel>
      )}
    </InertiaDrawer>
  )
}
