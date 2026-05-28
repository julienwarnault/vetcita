import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { DispatchAppointmentReminders } from '#notifications/actions/dispatch_appointment_reminders'

export default class SendReminders extends BaseCommand {
  static commandName = 'reminders:send'
  static description = 'Dispatch appointment reminders for tomorrow'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const queue = await this.app.container.make('queue.manager')
    await queue.loadJobs()

    const action = await this.app.container.make(DispatchAppointmentReminders)
    const result = await action.execute()

    if (result.appointmentsProcessed.length > 0) {
      this.logger.info(`Processed ${result.appointmentsProcessed.length} appointment(s)`)
    }

    this.logger.success('Reminders processing completed')
  }
}
