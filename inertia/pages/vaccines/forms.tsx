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
import { DEFAULT_LOCALE } from '~/lib/date'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  pet: Data.Pets.Pet
  appointments: Data.Booking.Appointment[]
  vaccine?: Data.MedicalRecords.Vaccine
}>

function dateInputValue(value?: string | Date | null) {
  if (!value) return ''
  return DateTime.fromISO(value + '').toFormat('yyyy-MM-dd')
}

export default function VaccineForm(props: PageProps) {
  const { pet, appointments, vaccine } = props

  const isEdit = !!vaccine
  const title = isEdit ? 'Editar vacuna' : 'Añadir una vacuna'

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
              route={isEdit ? 'update_vaccine.execute' : 'create_vaccine.execute'}
              routeParams={isEdit ? { petId: pet.id, id: vaccine.id } : { petId: pet.id }}
              className="min-h-0 gap-0"
              onSuccess={() => {
                close()
              }}
            >
              <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6">
                <Field name="name" className="col-span-6">
                  <Field.Label>Vacuna *</Field.Label>
                  <Input defaultValue={vaccine?.name ?? ''} />
                  <Field.Error />
                </Field>

                <Field name="date">
                  <Field.Label>Fecha de aplicación *</Field.Label>
                  <Input type="date" defaultValue={dateInputValue(vaccine?.date)} />
                  <Field.Error />
                </Field>

                <Field name="nextDueDate">
                  <Field.Label>Próxima aplicación</Field.Label>
                  <Input type="date" defaultValue={dateInputValue(vaccine?.nextDueDate)} />
                  <Field.Error />
                </Field>

                <Field name="appointmentId" className="col-span-6">
                  <Field.Label>Cita relacionada</Field.Label>
                  <NativeSelect defaultValue={vaccine?.appointmentId ?? ''}>
                    <NativeSelect.Option value="">Sin cita relacionada</NativeSelect.Option>
                    {appointments.map((appointment) => {
                      const startDate = DateTime.fromISO(appointment.localStartDate!)

                      return (
                        <NativeSelect.Option key={appointment.id} value={appointment.id}>
                          {startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL yyyy')} -{' '}
                          {appointment.service?.name}
                        </NativeSelect.Option>
                      )
                    })}
                  </NativeSelect>
                  <Field.Error />
                </Field>

                <Field name="batchNumber">
                  <Field.Label>Número de lote</Field.Label>
                  <Input defaultValue={vaccine?.batchNumber ?? ''} />
                  <Field.Error />
                </Field>

                <Field name="manufacturer">
                  <Field.Label>Fabricante</Field.Label>
                  <Input defaultValue={vaccine?.manufacturer ?? ''} />
                  <Field.Error />
                </Field>

                <Field name="notes" className="col-span-6">
                  <Field.Label>Notas</Field.Label>
                  <Textarea placeholder="Añadir observaciones sobre la vacuna" defaultValue={vaccine?.notes ?? ''} />
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
