import SendAppointmentConfirmationJob from '#notifications/jobs/send_appointment_confirmation_job'
import type AppointmentCreated from '#booking/events/appointment_created'

export default class SendConfirmationListener {
  async handle({ appointment }: AppointmentCreated) {
    await SendAppointmentConfirmationJob.dispatch({
      appointmentId: appointment.id,
    })
  }
}
