import { Data } from '@generated/data'
import { ClientSelector } from '~/components/client_selector'
import { InputSelect } from '~/components/ui/input_select'
import { InertiaModal } from '~/components/inertia_modal'
import { FormHeader } from '~/components/form_header'
import { Combobox } from '~/components/ui/combobox'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import MinimalLayout from '~/layouts/minimal'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  pet?: Data.Pets.Pet
  species: Data.Pets.Species[]
  breeds: Data.Pets.Breed[]
}>

export default function ShowForm(props: PageProps) {
  const { pet, species, breeds } = props

  const isEdit = !!pet
  const title = pet ? `Editar ${pet.name}` : 'Añadir una mascota'

  return (
    <InertiaModal>
      {({ close }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
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

            <Form
              id="form"
              route={isEdit ? 'update_pet.execute' : 'create_pet.execute'}
              routeParams={isEdit ? { id: pet.id } : undefined}
              className="gap-16 pb-24"
              onSuccess={close}
            >
              <div>
                <h2 className="text-2xl font-semibold">Ficha</h2>
                <p className="text-[15px]/5 text-muted">Gestiona el ficha de la mascota</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <Field name="name">
                    <Field.Label>Nombre *</Field.Label>
                    <Input placeholder="Nombre de la mascota" defaultValue={pet?.name ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="clientId">
                    <Field.Label>Dueño *</Field.Label>
                    <ClientSelector
                      name="clientId"
                      defaultValue={pet?.clientId ?? ''}
                      defaultName={pet?.client?.fullName}
                    />
                    <Field.Error />
                  </Field>

                  <Field name="speciesId">
                    <Field.Label>Especie *</Field.Label>
                    <InputSelect
                      items={species.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      defaultValue={pet?.speciesId}
                    />
                    <Field.Error />
                  </Field>

                  <Field name="breedId">
                    <Field.Label>Raza</Field.Label>
                    <Combobox
                      items={breeds.map((item) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                      defaultValue={pet?.breedId}
                    />
                    <Field.Error />
                  </Field>

                  <Field name="gender">
                    <Field.Label>Sexo</Field.Label>
                    <InputSelect
                      items={[
                        { label: 'Macho', value: 'male' },
                        { label: 'Hembra', value: 'female' },
                        { label: 'No determinado', value: 'unknown' },
                      ]}
                      defaultValue={pet?.gender}
                    />
                    <Field.Error />
                  </Field>

                  <Field name="dateOfBirth">
                    <Field.Label>Fecha de nacimiento</Field.Label>
                    <Input type="date" defaultValue={pet?.dateOfBirth ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="notes" className="col-span-6">
                    <Field.Label>Comentarios</Field.Label>
                    <Textarea placeholder="Añadir un comentario privado" defaultValue={pet?.notes ?? ''} />
                    <Field.Error />
                  </Field>
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
