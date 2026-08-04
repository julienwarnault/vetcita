import { NativeSelect } from '~/components/ui/native_select'
import type { OnboardingForm } from './use_onboarding_form'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Card } from '~/components/ui/card'

interface StepAddressProps {
  form: OnboardingForm
}

export function StepAddress(props: StepAddressProps) {
  const { form } = props

  return (
    <Card size="lg">
      <p className="text-[15px]/5 text-muted mb-6">
        Indica la dirección principal donde atiendes. Podrás modificarla más tarde desde los ajustes de la clínica.
      </p>

      <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6">
        <Field name="address" className="col-span-6">
          <Field.Label>Dirección</Field.Label>
          <Input value={form.data.address} onChange={(e) => form.setData('address', e.target.value)} />
          <Field.Error />
        </Field>

        <Field name="city">
          <Field.Label>Ciudad</Field.Label>
          <Input value={form.data.city} onChange={(e) => form.setData('city', e.target.value)} />
          <Field.Error />
        </Field>

        <Field name="state">
          <Field.Label>Estado</Field.Label>
          <Input value={form.data.state} onChange={(e) => form.setData('state', e.target.value)} />
          <Field.Error />
        </Field>

        <Field name="postalCode">
          <Field.Label>Código postal</Field.Label>
          <Input value={form.data.postalCode} onChange={(e) => form.setData('postalCode', e.target.value)} />
          <Field.Error />
        </Field>

        <Field name="countryCode">
          <Field.Label>País</Field.Label>
          <NativeSelect value={form.data.countryCode} disabled>
            <NativeSelect.Option value="MX">México</NativeSelect.Option>
          </NativeSelect>
          <Field.Error />
        </Field>
      </div>
    </Card>
  )
}
