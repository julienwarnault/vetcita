import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'time_offs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table.string('description').nullable()
      table.string('type').notNullable()
      table.date('start').notNullable()
      table.date('end').notNullable()
      table.time('start_time').notNullable()
      table.time('end_time').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
