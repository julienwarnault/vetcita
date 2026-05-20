import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AppointmentType from '#app/appointment_types/models/appointment_type'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { AppointmentSchema } from '#database/schema'
import Patient from '#app/patients/models/patient'

export default class Appointment extends compose(AppointmentSchema, WithPrimaryUuid) {
  @belongsTo(() => AppointmentType)
  declare appointmentType: BelongsTo<typeof AppointmentType>

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>
}
