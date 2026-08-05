import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('service_id').notNullable().references('id').inTable('services')
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table.uuid('client_id').notNullable().references('id').inTable('clients')
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants')
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.integer('duration').notNullable()
      table.string('booking_ref', 8).notNullable().unique()
      table.string('booking_mode').notNullable()
      table.timestamp('reminder_sent_at', { useTz: true }).nullable()
      table.index(['tenant_id', 'agenda_id', 'start_date', 'end_date'])
      table.index(['tenant_id', 'client_id', 'start_date'])
      table.index(['tenant_id', 'updated_at'])
      table.index(['reminder_sent_at', 'start_date'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
