import { compose } from '@adonisjs/core/helpers'
import { belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import AppointmentType from '#appointment_types/models/appointment_type'
import { WithPrimaryUuid } from '#app/shared/mixins/with_primary_uuid'
import WorkingHour from '#scheduling/models/working_hour'
import { AgendaSchema } from '#database/schema'
import Tenant from '#tenants/models/tenant'

export default class Agenda extends compose(AgendaSchema, WithPrimaryUuid) {
  static table = 'agendas'

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @manyToMany(() => AppointmentType, { pivotTimestamps: true })
  declare appointmentTypes: ManyToMany<typeof AppointmentType>

  @hasMany(() => WorkingHour)
  declare workingHours: HasMany<typeof WorkingHour>
}
