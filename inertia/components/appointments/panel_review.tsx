import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { cn } from 'tailwind-variants'
import { TrashIcon } from 'lucide-react'
import { AppointmentForm } from './use_appointment_form'
import { DEFAULT_LOCALE } from '~/lib/date'
import { capitalize } from '~/lib/utils'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

interface PanelReviewProps {
  form: AppointmentForm
  appointmentType?: Data.AppointmentTypes.AppointmentType
  goToStep(step: number): void
  next(): void
}

export function PanelReview(props: PanelReviewProps) {
  const { form, appointmentType, next, goToStep } = props
  const { data, setData, isDirty } = form

  const startDate = DateTime.fromISO(data.startDate)
  const endDate = startDate.plus({ minutes: appointmentType?.duration || 0 })

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
      <Drawer.Header>
        <div
          className={cn('flex justify-between gap-4 p-8', data.id && 'bg-[#208901]  text-white')}
        >
          <div className="flex flex-col">
            <h1 className="text-[28px]/9 font-semibold">
              {capitalize(startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL'))}
            </h1>

            <div className="text-sm font-normal">{startDate.toFormat('h:mma').toLowerCase()}</div>
          </div>
          {data.id && (
            <div>
              <Button variant="secondary" className="text-white border-white bg-transparent">
                Reservada
              </Button>
            </div>
          )}
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Tipo de cita</h2>
          <div className="flex items-center gap-4 hover:bg-background rounded-xl -m-2 p-2">
            <div
              className="w-1 h-auto rounded-full self-stretch shrink-0"
              style={{ backgroundColor: appointmentType!.color }}
            />
            <div className="flex flex-1 flex-col gap-1 py-2">
              <div className="text-[17px]/6 font-medium">{appointmentType!.name}</div>

              <div className="text-[15px]/5 text-foreground">
                {`${startDate.toFormat('h:mma')} - ${endDate.toFormat('h:mma')}`.toLowerCase()}
              </div>
            </div>
            <div>
              <Button
                size="icon-sm"
                variant="secondary"
                onClick={() => {
                  setData('appointmentTypeId', '')
                  setData('startDate', '')
                  setData('agendaId', '')
                  goToStep(0)
                }}
              >
                <TrashIcon />
              </Button>
            </div>
          </div>
        </div>
      </Drawer.Body>
      <Drawer.Footer className="px-8 py-4">
        <Button
          type="button"
          onClick={next}
          className="w-full"
          variant="primary"
          size="lg"
          disabled={!!data.id && !isDirty}
        >
          Guardar
        </Button>
      </Drawer.Footer>
    </Drawer.MainPanel>
  )
}
