import { BookingForm } from './use_booking_form'
import { Field } from '../ui/field'
import { Input } from '../ui/input'

interface StepInfosProps {
  form: BookingForm
}

export function StepInfos({ form }: StepInfosProps) {
  const { data, setData } = form

  return (
    <>
      <Field name="firstName" className="col-span-6">
        <Field.Label>Nombre *</Field.Label>
        <Input value={data.firstName} onChange={(e) => setData('firstName', e.target.value)} />
        <Field.Error />
      </Field>

      <Field name="lastName" className="col-span-6">
        <Field.Label>Apellido *</Field.Label>
        <Input value={data.lastName} onChange={(e) => setData('lastName', e.target.value)} />
        <Field.Error />
      </Field>

      <Field name="phone" className="col-span-6">
        <Field.Label>Número de teléfono móvil *</Field.Label>
        <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
        <Field.Error />
      </Field>

      <Field name="email" className="col-span-6">
        <Field.Label>Correo *</Field.Label>
        <Input value={data.email} onChange={(e) => setData('email', e.target.value)} />
        <Field.Error />
      </Field>
    </>
  )
}
