import { Job } from '@adonisjs/queue'
import { inject } from '@adonisjs/core'
import type { JobOptions } from '@adonisjs/queue/types'
import { SendAppointmentConfirmation } from '#notifications/actions/send_appointment_confirmation'
import Appointment from '#booking/models/appointment'
import type { UUID } from '#shared/types'

interface SendAppointmentConfirmationPayload {
  appointmentId: UUID
}

@inject()
export default class SendAppointmentConfirmationJob extends Job<SendAppointmentConfirmationPayload> {
  static options: JobOptions = {
    queue: 'default',
    maxRetries: 3,
  }

  constructor(private readonly sendConfirmation: SendAppointmentConfirmation) {
    super()
  }

  async execute() {
    const { appointmentId } = this.payload

    const appointment = await Appointment.query()
      .where('id', appointmentId)
      .preload('client')
      .preload('service')
      .preload('tenant')
      .firstOrFail()

    await this.sendConfirmation.execute({ appointment })
  }
}
