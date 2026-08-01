import { Job } from '@adonisjs/queue'
import { inject } from '@adonisjs/core'
import logger from '@adonisjs/core/services/logger'
import type { JobOptions } from '@adonisjs/queue/types'
import { GetVaccinesNeedingReminder } from '#medical_records/queries/get_vaccines_needing_reminder'
import { SendVaccineReminder } from '#notifications/actions/send_vaccine_reminder'

@inject()
export default class SendVaccineRemindersJob extends Job {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  constructor(
    private readonly getVaccines: GetVaccinesNeedingReminder,
    private readonly sendVaccineReminder: SendVaccineReminder
  ) {
    super()
  }

  async execute() {
    const { vaccines } = await this.getVaccines.execute()

    for (const vaccine of vaccines) {
      await this.sendVaccineReminder.execute({ vaccine })
    }

    logger.info(`Processed ${vaccines.length} vaccine reminder(s)`)
  }
}
