import { Data } from '@generated/data'
import { InputSelect } from '~/components/ui/input_select'
import { InertiaModal } from '~/components/inertia_modal'
import { InputGroup } from '~/components/ui/input_group'
import { FormHeader } from '~/components/form_header'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import MinimalLayout from '~/layouts/minimal'
import { Field } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { Form } from '~/components/ui/form'
import { InertiaProps } from '~/types'
import { today } from '~/lib/date'

type PageProps = InertiaProps<{
  pet: Data.Pets.Pet
  consultation?: Data.MedicalRecords.Consultation
}>

export default function ShowForm(props: PageProps) {
  const { pet, consultation } = props

  const isEdit = !!consultation
  const title = consultation ? 'Editar consulta' : 'Añadir una consulta'

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

          <div className="container-xl">
            <div className="pt-9 pb-8">
              <h1 className="text-[40px]/11 font-bold">{title}</h1>
              <p className="mt-2 text-[17px]/6 text-muted">{pet.name}</p>
            </div>

            <Form
              id="form"
              route={isEdit ? 'update_consultation.execute' : 'create_consultation.execute'}
              routeParams={isEdit ? { petId: pet.id, id: consultation.id } : { petId: pet.id }}
              className="pb-24"
              onSuccess={() => {
                close()
              }}
            >
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:items-start">
                <main>
                  <h2 className="text-2xl font-semibold">Evaluación clínica</h2>
                  <p className="text-[15px]/5 text-muted">
                    Completa las observaciones, diagnóstico y plan de tratamiento
                  </p>

                  <div className="grid grid-cols-6 w-full gap-x-4 gap-y-6 pt-6">
                    <Field name="visitReason" className="col-span-6">
                      <Field.Label>Motivo de consulta</Field.Label>
                      <Textarea
                        placeholder="Motivo por el que se presenta la mascota"
                        defaultValue={consultation?.visitReason ?? ''}
                        className="min-h-24"
                      />
                      <Field.Error />
                    </Field>

                    <Field name="symptoms" className="col-span-6">
                      <Field.Label>Síntomas</Field.Label>
                      <Textarea
                        placeholder="Síntomas observados"
                        defaultValue={consultation?.symptoms ?? ''}
                        className="min-h-24"
                      />
                      <Field.Error />
                    </Field>

                    <Field name="diagnosis" className="col-span-6">
                      <Field.Label>Diagnóstico</Field.Label>
                      <Textarea
                        placeholder="Diagnóstico"
                        defaultValue={consultation?.diagnosis ?? ''}
                        className="min-h-24"
                      />
                      <Field.Error />
                    </Field>

                    <Field name="treatment" className="col-span-6">
                      <Field.Label>Tratamiento</Field.Label>
                      <Textarea
                        placeholder="Tratamiento indicado"
                        defaultValue={consultation?.treatment ?? ''}
                        className="min-h-20"
                      />
                      <Field.Error />
                    </Field>

                    <Field name="prescription" className="col-span-6">
                      <Field.Label>Prescripción</Field.Label>
                      <Textarea
                        placeholder="Medicamentos recetados, dosis, frecuencia..."
                        defaultValue={consultation?.prescription ?? ''}
                        className="min-h-20"
                      />
                      <Field.Error />
                    </Field>
                  </div>
                </main>

                <aside className="flex flex-col gap-12">
                  <div>
                    <h2 className="text-xl font-semibold">Contexto</h2>
                    <p className="text-[15px]/5 text-muted">Relaciona la consulta con una cita si corresponde</p>

                    <div className="grid grid-cols-1 w-full gap-y-6 pt-6">
                      <Field name="recordType" className="col-span-1">
                        <Field.Label>Tipo de consulta *</Field.Label>
                        <InputSelect
                          items={[
                            { label: 'Consulta', value: 'Consulta' },
                            { label: 'Cirugía', value: 'Cirugía' },
                            { label: 'Resultado de laboratorio', value: 'Resultado de laboratorio' },
                            { label: 'Imagen diagnóstica', value: 'Imagen diagnóstica' },
                            { label: 'Seguimiento', value: 'Seguimiento' },
                            { label: 'Emergencia', value: 'Emergencia' },
                            { label: 'Nota', value: 'Nota' },
                          ]}
                          defaultValue={consultation?.recordType ?? 'Consulta'}
                          placeholder="Seleccionar un tipo"
                        />
                        <Field.Error />
                      </Field>

                      <Field name="date" className="col-span-1">
                        <Field.Label>Fecha *</Field.Label>
                        <Input type="date" defaultValue={consultation?.date ?? today()?.toFormat('yyyy-MM-dd')} />
                        <Field.Error />
                      </Field>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">Constantes</h2>
                    <p className="text-[15px]/5 text-muted">Registra las mediciones tomadas durante la consulta</p>

                    <div className="grid grid-cols-1 w-full gap-y-6 pt-6">
                      <Field name="weight" className="col-span-1">
                        <Field.Label>Peso</Field.Label>
                        <InputGroup>
                          <InputGroup.Input
                            type="number"
                            step="0.01"
                            min="0"
                            inputMode="decimal"
                            placeholder="Ej. 8.50"
                            defaultValue={consultation?.weight ?? pet.weight ?? ''}
                          />
                          <InputGroup.Addon align="end">kg</InputGroup.Addon>
                        </InputGroup>
                        <Field.Error />
                      </Field>

                      <Field name="temperature" className="col-span-1">
                        <Field.Label>Temperatura</Field.Label>
                        <InputGroup>
                          <InputGroup.Input
                            type="number"
                            step="0.1"
                            min="0"
                            inputMode="decimal"
                            placeholder="Ej. 38.5"
                            defaultValue={consultation?.temperature ?? ''}
                          />
                          <InputGroup.Addon align="end">°C</InputGroup.Addon>
                        </InputGroup>
                        <Field.Error />
                      </Field>

                      <Field name="heartRate" className="col-span-1">
                        <Field.Label>Frecuencia cardiaca</Field.Label>
                        <InputGroup>
                          <InputGroup.Input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            placeholder="Ej. 90"
                            defaultValue={consultation?.heartRate ?? ''}
                          />
                          <InputGroup.Addon align="end">bpm</InputGroup.Addon>
                        </InputGroup>
                        <Field.Error />
                      </Field>

                      <Field name="respiratoryRate" className="col-span-1">
                        <Field.Label>Frecuencia respiratoria</Field.Label>
                        <InputGroup>
                          <InputGroup.Input
                            type="number"
                            min="0"
                            inputMode="numeric"
                            placeholder="Ej. 24"
                            defaultValue={consultation?.respiratoryRate ?? ''}
                          />
                          <InputGroup.Addon align="end">rpm</InputGroup.Addon>
                        </InputGroup>
                        <Field.Error />
                      </Field>
                    </div>
                  </div>
                </aside>
              </div>
            </Form>
          </div>
        </>
      )}
    </InertiaModal>
  )
}

ShowForm.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
