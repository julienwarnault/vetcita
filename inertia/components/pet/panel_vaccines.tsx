import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Drawer } from '../ui/drawer'
import { urlFor } from '~/lib/tuyau'
import { Badge } from '../ui/badge'
import { Empty } from '../ui/empty'
import { Card } from '../ui/card'

interface PanelVaccinesProps {
  vaccines: Data.MedicalRecords.Vaccine[]
  reload: () => void
}

export function PanelVaccines(props: PanelVaccinesProps) {
  const { vaccines, reload } = props
  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="bg-background border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Vacunas</h1>
      </Drawer.Header>
      <Drawer.Body className="bg-background">
        <div className="flex flex-col gap-2 w-full">
          {vaccines.map((vaccine) => {
            const date = DateTime.fromISO(vaccine.date + '')
            const nextDueDate = vaccine.nextDueDate ? DateTime.fromISO(vaccine.nextDueDate + '') : null

            return (
              <Card
                key={vaccine.id}
                size="lg"
                className="flex flex-col gap-4 cursor-pointer hover:border-border-strong"
                onClick={() => {
                  visitModal(urlFor('update_vaccine.render', { id: vaccine.id, petId: vaccine.petId }), {
                    onClose: reload,
                  })
                }}
              >
                <div>
                  <div className="flex justify-between gap-4">
                    <div className="text-[17px]/6 font-semibold">{vaccine.name}</div>
                    <Badge>{date.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL yyyy')}</Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    {vaccine.notes && (
                      <div className="text-[13px]/4 font-normal text-muted line-clamp-2">{vaccine.notes}</div>
                    )}
                    <div className="flex text-[13px]/4 font-normal text-muted separator-dot">
                      {vaccine.manufacturer && <span>{vaccine.manufacturer}</span>}
                      {vaccine.batchNumber && <span>{vaccine.batchNumber}</span>}
                    </div>
                  </div>

                  {nextDueDate && (
                    <div>
                      <div className="text-[13px]/4 font-semibold">Próxima aplicación</div>
                      <div className="text-[13px]/4 font-normal text-muted">
                        {nextDueDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL yyyy')}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}

          {vaccines.length === 0 && (
            <Empty
              heading="No hay vacunas"
              description="No se han registrado vacunas para esta mascota"
              border={true}
            />
          )}
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
