import { compose } from '@adonisjs/core/helpers'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AppointmentType from '#appointment_types/models/appointment_type'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { AppointmentSchema } from '#database/schema'
import Patient from '#patients/models/patient'
import Tenant from '#tenants/models/tenant'

export default class Appointment extends compose(AppointmentSchema, WithPrimaryUuid) {
  @belongsTo(() => AppointmentType)
  declare appointmentType: BelongsTo<typeof AppointmentType>

  @belongsTo(() => Patient)
  declare patient: BelongsTo<typeof Patient>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>
}
