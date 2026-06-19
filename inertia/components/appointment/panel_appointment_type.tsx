import { Data } from '@generated/data'
import { cn } from 'tailwind-variants'
import { AppointmentForm } from './use_appointment_form'
import { Breadcrumb } from '../ui/breadcrumbs'
import { formatDuration } from '~/lib/utils'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

interface PanelAppointmentTypeProps {
  form: AppointmentForm
  canContinue: boolean
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
  next(): void
}

export function PanelAppointmentType(props: PanelAppointmentTypeProps) {
  const { form, canContinue, next, appointmentTypes } = props
  const { data, setData } = form

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
      <Drawer.Header className="px-8 pt-8 pb-0 border-none relative">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Page>Tipo de cita</Breadcrumb.Page>
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
          <h3 className="font-semibold text-[19px]/6">Seleccionar tipo de cita</h3>
          <ul className="flex flex-col gap-3">
            {appointmentTypes.map((type) => (
              <li key={type.id}>
                <button
                  type="button"
                  onClick={() => {
                    setData('appointmentTypeId', type.id)
                    setData('startDate', '')
                  }}
                  className={cn(
                    'flex items-center justify-between bg-white border rounded-2xl p-4 w-full hover:bg-background',
                    data.appointmentTypeId === type.id && 'outline-2 -outline-offset-1 outline-accent'
                  )}
                >
                  <div className="font-medium text-base">{type.name}</div>
                  <div className="text-sm text-muted-foreground">{formatDuration(type.duration)}</div>
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
