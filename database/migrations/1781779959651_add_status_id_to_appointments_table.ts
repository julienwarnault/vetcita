import { BaseSchema } from '@adonisjs/lucid/schema'
import { AppointmentStatus } from '#appointment_statuses/enums/appointment_status'

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
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status_id')
    })
  }
}
