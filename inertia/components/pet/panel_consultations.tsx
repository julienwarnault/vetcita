import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Drawer } from '../ui/drawer'
import { urlFor } from '~/lib/tuyau'
import { Badge } from '../ui/badge'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelConsultationsProps {
  consultations: Data.MedicalRecords.Consultation[]
  reload: () => void
}

export function PanelConsultations(props: PanelConsultationsProps) {
  const { consultations, reload } = props

  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Consultas</h1>
      </Drawer.Header>
      <Drawer.Body className="bg-background">
        <div className="flex flex-col gap-2 w-full">
          {consultations.map((consultation) => {
            const startDate = DateTime.fromISO(consultation.createdAt!)

            return (
              <Card
                key={consultation.id}
                size="lg"
                className="flex flex-col gap-4 cursor-pointer hover:border-border-strong"
                onClick={() => {
                  visitModal(urlFor('update_consultation.render', { id: consultation.id, petId: consultation.petId }), {
                    onClose: reload,
                  })
                }}
              >
                <div>
                  <div className="flex justify-between">
                    <div className="text-[17px]/6 font-semibold">Consulta</div>
                    <Badge>{consultation.recordType}</Badge>
                  </div>
                  <div className="text-[13px]/4 font-normal text-muted">{consultation.agenda?.name}</div>
                </div>
                <div>
                  <div className="text-[15px]/5 font-medium">
                    {startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL yyyy')}
                  </div>
                  <div className="flex gap-2 text-[13px]/4 font-normal text-muted">
                    {consultation.weight && <div>{consultation.weight} kg</div>}
                    {consultation.temperature && <div>{consultation.temperature} °C</div>}
                    {consultation.heartRate && <div>{consultation.heartRate} bpm</div>}
                    {consultation.respiratoryRate && <div>{consultation.respiratoryRate} rpm</div>}
                  </div>
                  {consultation.visitReason && (
                    <div className="text-[13px]/4 font-normal text-muted line-clamp-2 mt-2">
                      {consultation.visitReason}
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
          {consultations.length == 0 && (
            <Empty
              heading="No hay citas"
              description="No se han creado citas para este mascota"
              illustration="/illustrations/calendar.png"
              border={true}
            />
          )}
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
