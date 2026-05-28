import emitter from '@adonisjs/core/services/emitter'
import { listeners } from '#generated/listeners'
import { events } from '#generated/events'

emitter.listen(events.booking.AppointmentCreated, [
  listeners.booking.BroadcastAppointmentCreated,
  listeners.notifications.SendAppointmentConfirmation,
])
