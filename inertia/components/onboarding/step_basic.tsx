import type { OnboardingForm } from './use_onboarding_form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Card } from '~/components/ui/card'

interface StepBasicProps {
  form: OnboardingForm
}

export function StepBasic(props: StepBasicProps) {
  const { form } = props

  return (
    <Card size="lg">
      <p className="text-[15px]/5 text-muted mb-6">
        Selecciona el nombre que aparecerá en tu perfil de reservas online.
      </p>

      <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6">
        <Field name="name" className="col-span-6">
          <Field.Label>Nombre de la clínica *</Field.Label>
          <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
          <Field.Error />
        </Field>

        <Field name="phone">
          <Field.Label>Teléfono *</Field.Label>
          <Input value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
          <Field.Error />
        </Field>

        <Field name="email">
          <Field.Label>Correo electrónico</Field.Label>
          <Input type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
          <Field.Error />
        </Field>
      </div>
    </Card>
  )
}
