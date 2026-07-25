import { BaseSchema } from '@adonisjs/lucid/schema'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .string('status_id', 36)
        .notNullable()
        .references('id')
        .inTable('appointment_statuses')
        .defaultTo(AppointmentStatus.BOOKED)
      table.index(['tenant_id', 'status_id', 'start_date'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['tenant_id', 'status_id', 'start_date'])
      table.dropColumn('status_id')
    })
  }
}
