import { belongsTo } from '@adonisjs/lucid/orm'
import { compose } from '@adonisjs/core/helpers'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AppointmentStatus from '#appointment_workflow/models/appointment_status'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import { AppointmentSchema } from '#database/schema'
import Service from '#services/models/service'
import Client from '#clients/models/client'
import Tenant from '#tenants/models/tenant'
import Agenda from '#agendas/models/agenda'
import Pet from '#pets/models/pet'

export type BookingMode = 'web' | 'phone'

export default class Appointment extends compose(AppointmentSchema, WithPrimaryUuid) {
  declare bookingMode: BookingMode

  @belongsTo(() => Service)
  declare service: BelongsTo<typeof Service>

  @belongsTo(() => Pet)
  declare pet: BelongsTo<typeof Pet>

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => Agenda)
  declare agenda: BelongsTo<typeof Agenda>

  @belongsTo(() => AppointmentStatus, { foreignKey: 'statusId' })
  declare status: BelongsTo<typeof AppointmentStatus>

  get localStartDate() {
    return this.startDate.setZone(DEFAULT_TIMEZONE)
  }

  get localEndDate() {
    return this.endDate.setZone(DEFAULT_TIMEZONE)
  }
}
