import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Drawer } from '../ui/drawer'
import { urlFor } from '~/lib/tuyau'
import { Badge } from '../ui/badge'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelPrescriptionsProps {
  prescriptions: Data.MedicalRecords.Prescription[]
  reload: () => void
}

const PRESCRIPTION_TYPE_LABELS: Record<string, string> = {
  'Vacunacion': 'Vacunación',
  'Desparasitacion': 'Desparasitación',
  'Chequeo general': 'Chequeo general',
  'Estetica': 'Estética',
  'Dental': 'Dental',
  'Otro': 'Otro',
}

export function PanelPrescriptions(props: PanelPrescriptionsProps) {
  const { prescriptions, reload } = props
  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Prescripciones</h1>
      </Drawer.Header>
      <Drawer.Body className="bg-background">
        <div className="flex flex-col gap-2 w-full">
          {prescriptions.map((prescription) => {
            const date = DateTime.fromISO(prescription.date + '')

            return (
              <Card
                key={prescription.id}
                size="lg"
                className="flex flex-col gap-4 cursor-pointer hover:border-border-strong"
                onClick={() => {
                  visitModal(urlFor('update_prescription.render', { id: prescription.id, petId: prescription.petId }), {
                    onClose: reload,
                  })
                }}
              >
                <div>
                  <div className="flex justify-between gap-4">
                    <div className="text-[17px]/6 font-semibold">{prescription.name}</div>
                    <Badge>{date.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL yyyy')}</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex text-[13px]/4 font-normal text-muted separator-dot">
                    <span>{PRESCRIPTION_TYPE_LABELS[prescription.type] || prescription.type}</span>
                    {prescription.intervalDays && <span>Cada {prescription.intervalDays} días</span>}
                  </div>

                  {prescription.notes && (
                    <div className="text-[13px]/4 font-normal text-muted line-clamp-2">{prescription.notes}</div>
                  )}
                </div>
              </Card>
            )
          })}

          {prescriptions.length === 0 && (
            <Empty
              heading="No hay prescripciones"
              description="No se han registrado prescripciones para esta mascota"
              border={true}
            />
          )}
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
