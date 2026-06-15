import SendAppointmentConfirmationJob from '#notifications/jobs/send_appointment_confirmation_job'
import type AppointmentRescheduled from '#booking/events/appointment_rescheduled'

export default class SendRescheduledListener {
  async handle({ appointment }: AppointmentRescheduled) {
    await SendAppointmentConfirmationJob.dispatch({
      appointmentId: appointment.id,
    })
  }
}
