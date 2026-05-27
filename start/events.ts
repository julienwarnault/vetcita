import emitter from '@adonisjs/core/services/emitter'
import { listeners } from '#generated/listeners'
import { events } from '#generated/events'

emitter.on(events.booking.AppointmentCreated, [listeners.booking.BroadcastAppointmentCreated])
