import { useRef } from 'react'
import { Data } from '@generated/data'
import { PanelAppointmentType } from '~/components/appointment/panel_appointment_type'
import { useAppointmentForm } from '~/components/appointment/use_appointment_form'
import { InertiaDrawer, InertiaDrawerRef } from '~/components/inertia_drawer'
import { PanelPatient } from '~/components/appointment/panel_patient'
import { PanelReview } from '~/components/appointment/panel_review'
import { PanelDate } from '~/components/appointment/panel_date'
import usePageProps from '~/hooks/use_page_props'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  patientId?: string
  appointment?: Data.Booking.Appointment
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
}>

export default function ShowForm(props: PageProps) {
  const { patientId, appointment, appointmentTypes: types } = props

  const isEdit = !!appointment

  const { user } = usePageProps()
  const tenant = user?.tenant

  const drawerRef = useRef<InertiaDrawerRef>(null)

  const { form, step, canContinue, actions } = useAppointmentForm({
    appointment,
    patientId,
    tenantId: tenant!.id,
    submitUrl: isEdit
      ? urlFor('update_appointment.execute', { id: appointment.id })
      : urlFor('create_appointment.execute'),
    method: isEdit ? 'put' : 'post',
  })

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
