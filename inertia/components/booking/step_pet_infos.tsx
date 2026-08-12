import { Data } from '@generated/data'
import { BookingForm } from './use_booking_form'
import { InputSelect } from '../ui/input_select'
import { Field } from '../ui/field'
import { Input } from '../ui/input'

interface StepPetInfosProps {
  form: BookingForm
  species: Data.Pets.Species[]
}

export function StepPetInfos({ species, form }: StepPetInfosProps) {
  const { data, setData } = form

  return (
    <>
      <Field name="petSpeciesId" className="col-span-6">
        <Field.Label>Especie *</Field.Label>
        <InputSelect
          items={species.map((item) => ({
            label: (
              <div className="flex items-center gap-2">
                <img src={item.illustrationUrl} className="size-7 rounded-full" />
                <span>{item.name}</span>
              </div>
            ),
            value: item.id,
          }))}
          value={data.petSpeciesId}
          onValueChange={(value) => setData('petSpeciesId', value!)}
        />
        <Field.Error />
      </Field>

      <Field name="petName" className="col-span-6">
        <Field.Label>Nombre *</Field.Label>
        <Input value={data.petName} onChange={(e) => setData('petName', e.target.value)} />
        <Field.Error />
      </Field>
    </>
  )
}
