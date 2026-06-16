import { useRef } from 'react'
import { Data } from '@generated/data'
import { PanelAppointmentType } from '~/components/appointments/panel_appointment_type'
import { useAppointmentForm } from '~/components/appointments/use_appointment_form'
import { InertiaDrawer, InertiaDrawerRef } from '~/components/inertia_drawer'
import { PanelPatient } from '~/components/appointments/panel_patient'
import { PanelReview } from '~/components/appointments/panel_review'
import { PanelDate } from '~/components/appointments/panel_date'
import usePageProps from '~/hooks/use_page_props'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  appointment?: Data.Booking.Appointment
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
}>

export default function ShowForm(props: PageProps) {
  const { appointment, appointmentTypes: types } = props

  const isEdit = !!appointment

  const { user } = usePageProps()
  const tenant = user?.tenant

  const drawerRef = useRef<InertiaDrawerRef>(null)

  const { form, step, canContinue, actions } = useAppointmentForm({
    appointment,
    tenantId: tenant!.id,
    submitUrl: isEdit
      ? urlFor('update_appointment.execute', { id: appointment.id })
      : urlFor('create_appointment.execute'),
    method: isEdit ? 'put' : 'post',
    onSuccess: handleSuccess,
  })

  function handleSuccess() {
    drawerRef.current?.close()
  }

  const selectedType = types.find((type) => type.id === form.data.appointmentTypeId)

  return (
    <InertiaDrawer ref={drawerRef}>
      <PanelPatient
        appointmentId={form.data.id}
        selectedPatientId={form.data.patientId}
        onChange={(patientId) => form.setData('patientId', patientId)}
      />
      {step.key == 'type' && (
        <PanelAppointmentType
          form={form}
          next={actions.next}
          canContinue={canContinue}
          appointmentTypes={types}
        />
      )}
      {step.key == 'datetime' && (
        <PanelDate
          form={form}
          next={actions.next}
          goToStep={actions.goToStep}
          canContinue={canContinue}
        />
      )}
      {step.key == 'review' && (
        <PanelReview
          form={form}
          next={actions.next}
          goToStep={actions.goToStep}
          appointmentType={selectedType!}
        />
      )}
    </InertiaDrawer>
  )
}
