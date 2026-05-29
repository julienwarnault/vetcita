import { Job } from '@adonisjs/queue'
import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import type { JobOptions } from '@adonisjs/queue/types'
import { GetAppointmentsNeedingReminder } from '#booking/queries/get_appointments_needing_reminder'
import { SendAppointmentReminder } from '#notifications/actions/send_appointment_reminder'

@inject()
export default class SendAppointmentRemindersJob extends Job {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  constructor(
    private readonly getAppointments: GetAppointmentsNeedingReminder,
    private readonly sendAppointmentReminders: SendAppointmentReminder
  ) {
    super()
  }

  async execute() {
    const { appointments } = await this.getAppointments.execute()

    for (const appointment of appointments) {
      await this.sendAppointmentReminders.execute({ appointment })
    }

    if (appointments.length > 0) {
      logger.info(`Processed ${appointments.length} appointment(s)`)
    }
  }
}
