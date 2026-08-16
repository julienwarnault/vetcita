import { Data } from '@generated/data'
import { Checkbox, CheckboxGroup } from '@base-ui/react'
import type { OnboardingForm } from './use_onboarding_form'
import { Avatar } from '~/components/ui/avatar'
import { Card } from '~/components/ui/card'

interface StepSpeciesProps {
  form: OnboardingForm
  species: Data.Pets.Species[]
}

export function StepSpecies(props: StepSpeciesProps) {
  const { form, species } = props

  return (
    <Card size="lg">
      <p className="text-[15px]/5 text-muted mb-6">
        Selecciona las especies que podrá atender esta clínica. Podrás cambiarlo más tarde desde los ajustes.
      </p>

      <CheckboxGroup
        allValues={species.map((item) => item.id)}
        value={form.data.speciesIds}
        onValueChange={(value) => form.setData('speciesIds', value)}
        className="grid lg:grid-cols-2 gap-4"
      >
        {species.map((item) => (
          <label key={item.id}>
            <Checkbox.Root
              value={item.id}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl border bg-surface p-4 transition-colors hover:border-border-strong hover:bg-background data-checked:outline-2 data-checked:outline-accent data-checked:-outline-offset-1"
            >
              <Avatar src={item.illustrationUrl} />
              <span className="text-[17px]/6 font-semibold">{item.name}</span>
            </Checkbox.Root>
          </label>
        ))}
      </CheckboxGroup>
    </Card>
  )
}
