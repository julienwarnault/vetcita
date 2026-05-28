import { inject } from '@adonisjs/core'
import { GetAppointmentsNeedingReminder } from '#booking/queries/get_appointments_needing_reminder'
import SendAppointmentReminder from '#notifications/jobs/send_appointment_reminder'

@inject()
export class DispatchAppointmentReminders {
  constructor(private getAppointments: GetAppointmentsNeedingReminder) {}

  async execute(): Promise<DispatchAppointmentRemindersResult> {
    const { appointments } = await this.getAppointments.execute()

    const appointmentsProcessed: string[] = []

    for (const { id } of appointments) {
      await SendAppointmentReminder.dispatch({ appointmentId: id })
      appointmentsProcessed.push(id)
    }

    return { appointmentsProcessed }
  }
}

interface DispatchAppointmentRemindersResult {
  appointmentsProcessed: string[]
}
