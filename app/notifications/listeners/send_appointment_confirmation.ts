import SendAppointmentConfirmationMail from '#notifications/jobs/send_appointment_confirmation_mail'
import type AppointmentCreated from '#booking/events/appointment_created'

export default class SendAppointmentConfirmation {
  async handle(event: AppointmentCreated) {
    const { appointment } = event

    await SendAppointmentConfirmationMail.dispatch({ appointmentId: appointment.id })
  }
}
