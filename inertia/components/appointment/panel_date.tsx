import { StartDatePicker } from '../booking/start_date_picker'
import { AppointmentForm } from './use_appointment_form'
import { Breadcrumb } from '../ui/breadcrumbs'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'

interface PanelDateProps {
  form: AppointmentForm
  canContinue: boolean
  goToStep(step: number): void
  next(): void
}

export function PanelDate(props: PanelDateProps) {
  const { form, canContinue, next, goToStep } = props
  const { data, setData } = form

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
      <Drawer.Header className="px-8 pt-8 pb-0 border-none relative">
        <Breadcrumb>
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link render={<button onClick={() => goToStep(0)} />}>Tipo de cita</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Hora</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>
      </Drawer.Header>
      <Drawer.Body className="w-120">
        <StartDatePicker
          tenantId={data.tenantId}
          appointmentTypeId={data.appointmentTypeId}
          appointmentId={data.id || undefined}
          value={data.startDate || undefined}
          startDate={data.startDate || undefined}
          onValueChange={(start, agendaId) => {
            setData('startDate', start)
            setData('agendaId', agendaId)
          }}
        />
      </Drawer.Body>
      <Drawer.Footer className="px-8 py-4">
        <Button type="button" disabled={!canContinue} onClick={next} className="w-full" variant="primary" size="lg">
          Continuar
        </Button>
      </Drawer.Footer>
    </Drawer.MainPanel>
  )
}
