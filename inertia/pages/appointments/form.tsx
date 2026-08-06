import { useRef } from 'react'
import { Data } from '@generated/data'
import { useAppointmentForm } from '~/components/appointment/use_appointment_form'
import { InertiaDrawer, InertiaDrawerRef } from '~/components/inertia_drawer'
import { PanelService } from '~/components/appointment/panel_service'
import { PanelClient } from '~/components/appointment/panel_client'
import { PanelReview } from '~/components/appointment/panel_review'
import { PanelDate } from '~/components/appointment/panel_date'
import { PanelPet } from '~/components/appointment/panel_pet'
import usePageProps from '~/hooks/use_page_props'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  clientId?: string
  petId?: string
  appointment?: Data.Booking.Appointment
  agendas: Data.Agendas.Agenda[]
  services: Data.Services.Service[]
  statuses: Data.AppointmentWorkflow.AppointmentStatus[]
}>

export default function ShowForm(props: PageProps) {
  const { clientId, petId, appointment, services, statuses, agendas } = props

  const isEdit = !!appointment

  const { user } = usePageProps()
  const tenant = user?.agenda?.tenantId

  const drawerRef = useRef<InertiaDrawerRef>(null)

  const { form, step, canContinue, actions } = useAppointmentForm({
    appointment,
    clientId,
    petId,
    tenantId: tenant!,
    submitUrl: isEdit
      ? urlFor('update_appointment.execute', { id: appointment.id })
      : urlFor('create_appointment.execute'),
    method: isEdit ? 'put' : 'post',
  })

  const selectedService = services.find(({ id }) => id === form.data.serviceId)
  const selectedStatus = statuses.find(({ id }) => id === appointment?.statusId)
  const selectedAgenda = agendas.find(({ id }) => id === form?.data.agendaId)

  return (
    <InertiaDrawer ref={drawerRef}>
      {/* Left */}
      {!form.data.clientId && (
        <PanelClient
          selectedClientId={form.data.clientId}
          onChange={(clientId) => form.setData('clientId', clientId)}
        />
      )}
      {form.data.clientId && (
        <PanelPet
          selectedClientId={form.data.clientId}
          selectedPetId={form.data.petId}
          onChange={(petId) => form.setData('petId', petId)}
          reset={() => {
            form.setData('petId', '')
            form.setData('clientId', '')
          }}
        />
      )}
      {/* Right */}
      {step.key == 'service' && (
        <PanelService form={form} next={actions.next} canContinue={canContinue} services={services} />
      )}
      {step.key == 'datetime' && (
        <PanelDate form={form} next={actions.next} goToStep={actions.goToStep} canContinue={canContinue} />
      )}
      {step.key == 'review' && (
        <PanelReview
          form={form}
          next={actions.next}
          goToStep={actions.goToStep}
          canContinue={canContinue}
          service={selectedService!}
          status={selectedStatus}
          agenda={selectedAgenda}
          statuses={statuses}
          agendas={agendas}
          close={() => drawerRef.current?.close()}
        />
      )}
    </InertiaDrawer>
  )
}
