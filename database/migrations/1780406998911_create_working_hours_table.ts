import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'working_hours'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table.integer('day_of_week').notNullable()
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
      table.index(['agenda_id', 'day_of_week'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
