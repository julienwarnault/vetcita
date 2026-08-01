import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import SendAppointmentRemindersJob from '#notifications/jobs/send_appointment_reminders_job'

export default class SendReminders extends BaseCommand {
  static commandName = 'reminders:appointment:send'
  static description = 'Dispatch appointment reminders for tomorrow'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const queue = await this.app.container.make('queue.manager')
    await queue.loadJobs()

    const router = await this.app.container.make('router')
    router.commit()

    await SendAppointmentRemindersJob.dispatch({})

    this.logger.success('Reminders processing completed')
  }
}
