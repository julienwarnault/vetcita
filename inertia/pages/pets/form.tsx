import { Data } from '@generated/data'
import { ClientSelector } from '~/components/client_selector'
import { InputSelect } from '~/components/ui/input_select'
import { InertiaModal } from '~/components/inertia_modal'
import { InputGroup } from '~/components/ui/input_group'
import { FormHeader } from '~/components/form_header'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { Switch } from '~/components/ui/switch'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import MinimalLayout from '~/layouts/minimal'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  pet?: Data.Pets.Pet
  client?: Data.Clients.Client
  species: Data.Pets.Species[]
}>

export default function ShowForm(props: PageProps) {
  const { client, pet, species } = props

  const isEdit = !!pet
  const title = pet ? `Editar ${pet.name}` : 'Añadir una mascota'

  return (
    <InertiaModal>
      {({ close, emit }) => (
        <>
          <FormHeader
            title={title}
            rightElement={
              <>
                <Button size="lg" variant="secondary" onClick={close}>
                  Cerrar
                </Button>
                <Button type="submit" size="lg" form="pet-form">
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
              id="pet-form"
              route={isEdit ? 'update_pet.execute' : 'create_pet.execute'}
              routeParams={isEdit ? { id: pet.id } : undefined}
              className="gap-16 pb-24"
              onSuccess={(data: any) => {
                !isEdit && emit('onCreate', data.props.flash.petId)
                close()
              }}
            >
              <div>
                <h2 className="text-2xl font-semibold">Datos básicos</h2>
                <p className="text-[15px]/5 text-muted">Gestiona la ficha principal de la mascota</p>

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
                      defaultValue={pet?.clientId ?? client?.id ?? ''}
                      defaultName={pet?.client?.fullName ?? client?.fullName ?? ''}
                      disabled={!!client}
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

                  <Field name="breed">
                    <Field.Label>Raza</Field.Label>
                    <Input placeholder="Ej. Labrador, Siamés" defaultValue={pet?.breed ?? ''} />
                    <Field.Error />
                  </Field>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Características</h2>
                <p className="text-[15px]/5 text-muted">Añade los detalles físicos de la mascota</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <Field name="gender" className="col-span-3">
                    <Field.Label>Sexo</Field.Label>
                    <InputSelect
                      items={[
                        { label: 'Macho', value: 'male' },
                        { label: 'Hembra', value: 'female' },
                        { label: 'No definido', value: 'unknown' },
                      ]}
                      defaultValue={pet?.gender}
                    />
                    <Field.Error />
                  </Field>

                  <Field name="isNeutered" className="col-span-3">
                    <Field.Label>Esterilizado/a</Field.Label>
                    <div className="flex h-12 items-center ">
                      <Switch
                        name="isNeutered"
                        defaultChecked={pet?.isNeutered ?? false}
                        value="true"
                        uncheckedValue="false"
                      />
                    </div>
                    <Field.Error />
                  </Field>

                  <Field name="dateOfBirth">
                    <Field.Label>Fecha de nacimiento</Field.Label>
                    <Input type="date" defaultValue={pet?.dateOfBirth ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="color">
                    <Field.Label>Color</Field.Label>
                    <Input placeholder="Ej. Negro, blanco y café" defaultValue={pet?.color ?? ''} />
                    <Field.Error />
                  </Field>

                  <Field name="weight">
                    <Field.Label>Peso</Field.Label>
                    <InputGroup>
                      <InputGroup.Input
                        type="number"
                        step="0.01"
                        min="0"
                        inputMode="decimal"
                        placeholder="Ej. 8.50"
                        defaultValue={pet?.weight ?? ''}
                      />
                      <InputGroup.Addon align="end">kg</InputGroup.Addon>
                    </InputGroup>
                    <Field.Error />
                  </Field>

                  <Field name="bloodType">
                    <Field.Label>Grupo sanguíneo</Field.Label>
                    <Input placeholder="Ej. DEA 1.1, A, B" defaultValue={pet?.bloodType ?? ''} />
                    <Field.Error />
                  </Field>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold">Salud y notas</h2>
                <p className="text-[15px]/5 text-muted">Guarda información útil para futuras consultas</p>

                <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                  <Field name="allergies" className="col-span-6">
                    <Field.Label>Alergias</Field.Label>
                    <Textarea placeholder="Añadir alergias conocidas" defaultValue={pet?.allergies ?? ''} />
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
