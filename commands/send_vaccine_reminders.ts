import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import SendVaccineRemindersJob from '#notifications/jobs/send_vaccine_reminders_job'

export default class SendVaccineReminders extends BaseCommand {
  static commandName = 'reminders:vaccine:send'
  static description = 'Dispatch vaccine reminders for vaccines due in three weeks'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const queue = await this.app.container.make('queue.manager')
    await queue.loadJobs()

    const router = await this.app.container.make('router')
    router.commit()

    await SendVaccineRemindersJob.dispatch({})

    this.logger.success('Vaccine reminders processing completed')
  }
}
