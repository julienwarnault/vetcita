import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vaccines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.uuid('pet_id').notNullable().references('id').inTable('pets').onDelete('CASCADE')
      table.uuid('agenda_id').nullable().references('id').inTable('agendas').onDelete('SET NULL')
      table.string('name').notNullable()
      table.date('date').notNullable()
      table.date('next_due_date').nullable()
      table.string('batch_number').nullable()
      table.string('manufacturer').nullable()
      table.text('notes').nullable()
      table.timestamp('reminder_sent_at').nullable()
      table.index(['tenant_id', 'pet_id', 'created_at'])
      table.index(['next_due_date', 'reminder_sent_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
