import { Data } from '@generated/data'
import { cn } from 'tailwind-variants'
import { formatDuration, formatPrice } from '~/lib/utils'
import { AppointmentForm } from './use_appointment_form'
import { Breadcrumb } from '../ui/breadcrumbs'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

interface PanelServiceProps {
  form: AppointmentForm
  canContinue: boolean
  services: Data.Services.Service[]
  next(): void
}

export function PanelService(props: PanelServiceProps) {
  const { form, canContinue, next, services } = props
  const { data, setData } = form

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
      <Drawer.Header className="px-8 pt-8 pb-0 border-none relative">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Page>Servicio</Breadcrumb.Page>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link>Hora</Breadcrumb.Link>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </Drawer.Header>
      <Drawer.Body className="w-120">
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-[19px]/6">Seleccionar servicio</h3>
          <ul className="flex flex-col gap-3">
            {services.map((service) => (
              <li key={service.id}>
                <button
                  type="button"
                  onClick={() => {
                    setData('serviceId', service.id)
                    setData('startDate', '')
                  }}
                  className={cn(
                    'flex items-start bg-white border rounded-2xl p-4 w-full hover:bg-background',
                    data.serviceId === service.id && 'outline-2 -outline-offset-1 outline-accent'
                  )}
                >
                  <div className="flex flex-col items-start">
                    <p className="text-[17px]/6 font-medium mb-0.5">{service.name}</p>
                    <p className="text-[15px]/5 text-muted">{formatDuration(service.duration)}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="text-[15px]/5 font-medium">{formatPrice(service.price ?? 0)}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Drawer.Body>
      <Drawer.Footer className="px-8 py-4">
        <Button type="button" disabled={!canContinue} onClick={next} className="w-full" variant="primary" size="lg">
          Continuar
        </Button>
      </Drawer.Footer>
    </Drawer.MainPanel>
  )
}
