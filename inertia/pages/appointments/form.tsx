import { useRef } from 'react'
import { Data } from '@generated/data'
import { PanelAppointmentType } from '~/components/appointment/panel_appointment_type'
import { useAppointmentForm } from '~/components/appointment/use_appointment_form'
import { InertiaDrawer, InertiaDrawerRef } from '~/components/inertia_drawer'
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
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
  statuses: Data.AppointmentWorkflow.AppointmentStatus[]
}>

export default function ShowForm(props: PageProps) {
  const { clientId, petId, appointment, appointmentTypes: types, statuses } = props

  const isEdit = !!appointment

  const { user } = usePageProps()
  const tenant = user?.tenant

  const drawerRef = useRef<InertiaDrawerRef>(null)

  const { form, step, canContinue, actions } = useAppointmentForm({
    appointment,
    clientId,
    petId,
    tenantId: tenant!.id,
    submitUrl: isEdit
      ? urlFor('update_appointment.execute', { id: appointment.id })
      : urlFor('create_appointment.execute'),
    method: isEdit ? 'put' : 'post',
  })

  const selectedType = types.find(({ id }) => id === form.data.appointmentTypeId)
  const selectedStatus = statuses.find(({ id }) => id === appointment?.statusId)

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
      {step.key == 'type' && (
        <PanelAppointmentType form={form} next={actions.next} canContinue={canContinue} appointmentTypes={types} />
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
          appointmentType={selectedType!}
          status={selectedStatus}
          statuses={statuses}
          close={() => drawerRef.current?.close()}
        />
      )}
    </InertiaDrawer>
  )
}
