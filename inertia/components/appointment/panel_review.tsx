import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import { CheckIcon, TrashIcon } from 'lucide-react'
import { AppointmentForm } from './use_appointment_form'
import { DEFAULT_LOCALE } from '~/lib/date'
import { capitalize } from '~/lib/utils'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'
import { urlFor } from '~/lib/tuyau'
import { Menu } from '../ui/menu'

interface PanelReviewProps {
  form: AppointmentForm
  service?: Data.Services.Service
  status?: Data.AppointmentWorkflow.AppointmentStatus
  statuses: Data.AppointmentWorkflow.AppointmentStatus[]
  canContinue: boolean
  goToStep(step: number): void
  next(): void
  close(): void
}

export function PanelReview(props: PanelReviewProps) {
  const { form, service, statuses, status, canContinue, next, goToStep, close } = props
  const { data, setData, isDirty } = form

  const startDate = DateTime.fromISO(data.startDate)
  const endDate = startDate.plus({ minutes: service?.duration || 0 })

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
      <Drawer.Header>
        <div
          className={cn('flex justify-between gap-4 p-8', data.id && 'text-white')}
          style={{ backgroundColor: data.id && status ? status.color : '#fff' }}
        >
          <div className="flex flex-col">
            <h1 className="text-[28px]/9 font-semibold">
              {capitalize(startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL'))}
            </h1>

            <div className="text-sm font-normal">{startDate.toFormat('h:mma').toLowerCase()}</div>
          </div>
          {data.id && status && (
            <div>
              <Menu
                trigger={
                  <Button variant="secondary" className="text-white border-white bg-transparent">
                    {status.name} <Menu.TriggerIcon />
                  </Button>
                }
                align="end"
              >
                {statuses.map((s) => (
                  <Menu.Item
                    className="flex justify-between"
                    key={s.id}
                    onClick={() => {
                      router.patch(
                        urlFor('change_appointment_status.execute', { id: data.id }),
                        { statusId: s.id },
                        { onFinish: close }
                      )
                    }}
                  >
                    {s.name}
                    {status.id == s.id && <CheckIcon className="size-5!" />}
                  </Menu.Item>
                ))}
              </Menu>
            </div>
          )}
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Servicio</h2>
          <div className="flex items-center gap-4 hover:bg-background rounded-xl -m-2 p-2">
            <div
              className="w-1 h-auto rounded-full self-stretch shrink-0"
              style={{ backgroundColor: service!.color }}
            />
            <div className="flex flex-1 flex-col gap-1 py-2">
              <div className="text-[17px]/6 font-medium">{service!.name}</div>

              <div className="text-[15px]/5 text-muted">
                {`${startDate.toFormat('h:mma')} - ${endDate.toFormat('h:mma')}`.toLowerCase()}
              </div>
            </div>
            <div>
              <Button
                size="icon-sm"
                variant="secondary"
                onClick={() => {
                  setData('serviceId', '')
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
          disabled={(!!data.id && !isDirty) || !canContinue}
        >
          Guardar
        </Button>
      </Drawer.Footer>
    </Drawer.MainPanel>
  )
}
