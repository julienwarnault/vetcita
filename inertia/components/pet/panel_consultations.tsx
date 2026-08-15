import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { parseDate } from '~/lib/date'
import { Button } from '../ui/button'
import { Drawer } from '../ui/drawer'
import { urlFor } from '~/lib/tuyau'
import { Badge } from '../ui/badge'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelConsultationsProps {
  petId: string
  consultations: Data.MedicalRecords.Consultation[]
  reload: () => void
}

export function PanelConsultations(props: PanelConsultationsProps) {
  const { petId, consultations, reload } = props

  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px]/9 font-semibold">Consultas</h1>
          <Button
            variant="secondary"
            onClick={() => visitModal(urlFor('create_consultation.render', { petId }), { onClose: reload })}
          >
            Añadir
          </Button>
        </div>
      </Drawer.Header>
      <Drawer.Body className="bg-background">
        <div className="flex flex-col gap-2 w-full">
          {consultations.map((consultation) => (
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
                <div className="text-[13px]/4 font-normal text-muted">{consultation.agenda?.fullName}</div>
              </div>
              <div>
                <div className="text-[15px]/5 font-medium">
                  {parseDate(consultation.date)?.toFormat('ccc. d LLL yyyy')}
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
          ))}
          {consultations.length == 0 && (
            <Empty
              heading="No hay consultas"
              description="No se han registrado consultas para esta mascota"
              border={true}
            />
          )}
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
