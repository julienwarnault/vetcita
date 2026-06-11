import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('appointment_type_id').notNullable().references('id').inTable('appointment_types')
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table.uuid('patient_id').nullable().references('id').inTable('patients')
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants')
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.integer('duration').notNullable()
      table.string('booking_ref', 8).notNullable().unique()
      table.timestamp('reminder_sent_at', { useTz: true }).nullable()
      table.index(['reminder_sent_at', 'start_date'])
      table.index(['start_date', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
