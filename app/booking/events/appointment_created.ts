import { BaseEvent } from '@adonisjs/core/events'
import type Appointment from '#booking/models/appointment'

export default class AppointmentCreated extends BaseEvent {
  constructor(public appointment: Appointment) {
    super()
  }
}
